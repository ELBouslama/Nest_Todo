import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //on a fait new car , l'injection se fait au niveau du Appmodule ,pas d'injection au niveau du main.ts
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist:true,forbidNonWhitelisted: true})); 
  await app.listen(3000);
}
bootstrap();
