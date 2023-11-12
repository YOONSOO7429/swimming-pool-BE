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
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // auth 미들웨어
    consumer.apply(AuthMiddleWare).forRoutes(
      // user
      { path: 'user/deleteUser', method: RequestMethod.DELETE },
      // lecture
      { path: 'lecture/create', method: RequestMethod.POST },
      { path: 'lecture/lectureList', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/detail', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/edit', method: RequestMethod.PUT },
      // Member
      { path: 'member/:lectureId/registMember', method: RequestMethod.POST },
    );
  }
}
