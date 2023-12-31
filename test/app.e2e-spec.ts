import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // user
  // it('/api/user/signUp (POST)', async () => {
  //   const signUpDto = {
  //     identification: 'testUser',
  //     userType: '회원',
  //     password: 'swim1234',
  //     name: '홍길동',
  //     gender: '남자',
  //     birth: '1985.08.15',
  //   };

  //   const response = await request(app.getHttpServer())
  //     .post('/api/user/signUp')
  //     .send(signUpDto)
  //     .expect(HttpStatus.OK);

  //   expect(response.body.message).toBe('회원 가입 성공');
  // });
});
