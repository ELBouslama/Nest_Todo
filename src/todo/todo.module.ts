import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
