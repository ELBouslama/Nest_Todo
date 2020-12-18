import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan' ;
import { DurationInterceptor } from './interceptors/duration.interceptor';
import { TransDataInterceptor } from './interceptors/trans-data.interceptor';
import * as dotenv from 'dotenv';
//pour la env
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
   origin: ['http://localhost:4200'], 
   optionsSuccessStatus: 202
  })
  app.use(morgan('dev')) ;
  app.useGlobalInterceptors(new DurationInterceptor(),new TransDataInterceptor()) ;
  //on a fait new car , l'injection se fait au niveau du Appmodule ,pas d'injection au niveau du main.ts , car elle n'est pas dans le contexte des modules
  app.useGlobalPipes(new ValidationPipe({transform: true, whitelist:true,forbidNonWhitelisted: true})); 
 
 /*  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log(port) */
  dotenv.config();


  await app.listen(process.env.PORT );
}
bootstrap();
