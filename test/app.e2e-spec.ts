import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { MemberModule } from 'src/member/member.module';
import { LectureModule } from 'src/lecture/Lecture.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import { ParticipantModule } from 'src/participant/participant.module';
import { CommentModule } from 'src/comment/comment.module';
import { RecommentModule } from 'src/recomment/recomment.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
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
        ParticipantModule,
        CommentModule,
        RecommentModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  // user
  it('/api/user/signUp (POST)', async () => {
    const signUpDto = {
      identification: 'testUser',
      userType: '회원',
      password: 'swim1234',
      name: '홍길동',
      gender: '남자',
      birth: '1985.08.15',
    };

    const response = await request(app.getHttpServer())
      .post('/api/user/signUp')
      .send(signUpDto)
      .expect(HttpStatus.OK);

    expect(response.body.message).toBe('회원 가입 성공');
  });
});
