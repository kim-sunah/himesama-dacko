import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.PORT  || 4000; 
  app.useGlobalPipes(new ValidationPipe({ transform: true}));
    app.enableCors({ 
      origin: 
      true,methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept , Authorization , X-XSRF-TOKEN',
      credentials: true,
    });
  await app.listen(Port);
}
bootstrap();
