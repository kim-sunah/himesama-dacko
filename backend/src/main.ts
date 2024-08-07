import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true}));

  app.use(cookieParser())
  app.use(
    session({
      secret: 'wqdsdsf123', // 반드시 변경할 것
      resave: false,
      saveUninitialized: false,
     
    }),
  );

  dotenv.config();
    app.enableCors({ 
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept , Authorization , X-XSRF-TOKEN',
      credentials: true,
    });
  await app.listen(4000);
}
bootstrap();
