import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleWare } from './middleware/auth.middleware';
import { MemberModule } from './member/member.module';
import { LectureModule } from './Lecture/Lecture.module';
import { LessonModule } from './lesson/lesson.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // db 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      timezone: 'Asia/Seoul',
      // synchronize: true,
      synchronize: false,
    }),
    UserModule,
    MemberModule,
    LectureModule,
    LessonModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // auth 미들웨어
    consumer.apply(AuthMiddleWare).forRoutes(
      // User
      { path: 'user/deleteUser', method: RequestMethod.DELETE },
      // Lecture
      { path: 'lecture/create', method: RequestMethod.POST },
      { path: 'lecture/lectureList', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/detail', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/edit', method: RequestMethod.PUT },
      // Member
      { path: 'member/:lectureId/registMember', method: RequestMethod.POST },
      // Lesson
      { path: 'lesson/:lectureId/record', method: RequestMethod.POST },
      { path: 'lesson/:lessonId/edit', method: RequestMethod.PUT },
      { path: 'lesson/:lessonId/delete', method: RequestMethod.DELETE },
    );
  }
}
