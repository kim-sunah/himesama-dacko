import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true}));

  app.use(cookieParser(),
  session({
    secret: 'wqdsdsf123', // 실제 비밀 키를 사용하세요
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000, httpOnly: true }, // 1시간
  }),);


  dotenv.config();
    app.enableCors({ 
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept , Authorization , X-XSRF-TOKEN',
      credentials: true,
    });
  await app.listen(4000);
}
bootstrap();
