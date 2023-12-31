import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); // 입력값 유효성 검사를 위한 ValidationPipe 추가
  app.setGlobalPrefix('api'); //글로벌 프리픽스 설정
  await app.listen(80);
}
bootstrap();
