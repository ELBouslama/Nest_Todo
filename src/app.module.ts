import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import * as dotenv from 'dotenv';
import { TodoEntity } from './todo/entities/todo.entity';
dotenv.config();
@Module({
  imports: [
    TestModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
//settings the middlewares for the nest app {path:'uri' , method:RequestMethod.GET}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(HelmetMiddleware)
      .forRoutes('')
      .apply(LoggerMiddleware)
      .forRoutes('');
  }
}
