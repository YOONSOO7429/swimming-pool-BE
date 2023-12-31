import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleWare } from '@src/middleware/auth.middleware';
import { MemberModule } from '@src/member/member.module';
import { LectureModule } from '@src/lecture/Lecture.module';
import { LessonModule } from '@src/lesson/lesson.module';
import { FeedbackModule } from '@src/feedback/feedback.module';
import { ParticipantModule } from '@src/participant/participant.module';
import { CommentModule } from '@src/comment/comment.module';
import { RecommentModule } from '@src/recomment/recomment.module';

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
      // synchronize: true,
      synchronize: false,
    }),
    UserModule,
    MemberModule,
    LectureModule,
    LessonModule,
    FeedbackModule,
    ParticipantModule,
    CommentModule,
    RecommentModule,
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
      { path: 'lecture/createLecture', method: RequestMethod.POST },
      { path: 'lecture/lectureList', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/detailLecture', method: RequestMethod.GET },
      { path: 'lecture/:lectureId/editLecture', method: RequestMethod.PUT },
      {
        path: 'lecture/:lectureId/deleteLecture',
        method: RequestMethod.DELETE,
      },
      // Member
      { path: 'member/:lectureId/registMember', method: RequestMethod.POST },
      // Lesson
      { path: 'lesson/:lectureId/recordLesson', method: RequestMethod.POST },
      { path: 'lesson/:lessonId/detailLesson', method: RequestMethod.GET },
      { path: 'lesson/:lessonId/editLesson', method: RequestMethod.PUT },
      { path: 'lesson/:lessonId/deleteLesson', method: RequestMethod.DELETE },
      // Feedback
      { path: 'feedback/:lessonId/createFeedback', method: RequestMethod.POST },
      {
        path: 'feedback/:lessonId/:feedbackId/editFeedback',
        method: RequestMethod.PUT,
      },
      {
        path: 'feedback/:lessonId/:feedbackId/deleteFeedback',
        method: RequestMethod.DELETE,
      },
      // Comment
      { path: 'comment/:lectureId/createComment', method: RequestMethod.POST },
      {
        path: 'comment/:lectureId/:commentId/editComment',
        method: RequestMethod.PUT,
      },
      {
        path: 'comment/:lectureId/:commentId/deleteComment',
        method: RequestMethod.PUT,
      },
      // Recomment
      {
        path: 'recomment/:commentId/createRecomment',
        method: RequestMethod.POST,
      },
      {
        path: 'recomment/:commentId/:recommentId/editRecomment',
        method: RequestMethod.PUT,
      },
      {
        path: 'recomment/:commentId/:recommentId/deleteRecomment',
        method: RequestMethod.DELETE,
      },
    );
  }
}
