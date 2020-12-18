import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import { FirstpipePipe } from 'src/pipes/firstpipe.pipe';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('')
  getTodos(): Promise<TodoEntity[]> {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: number) {
    return this.todoService.findTodoById(id);
  }

  @Post('/create')
  async makeTodos(
    @Body(FirstpipePipe) newTodo: CreateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.createTodo(newTodo);
  }

  @Delete('/delete/:id')
  deleteTodos(@Param('id') id) {
    return this.todoService.deleteTodo(id);
  }

  @Get('/restore/:id')
  restoreTodoById(@Param('id') id: string) {
    return this.todoService.restoreTodo(id);
  }
  // updating only one of the attributs of a todo

  @Put('/update/:id')
  updateTodosAll(
    @Body() newTodo: UpdateTodoDto,
    @Param('id') id,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(id, newTodo);
  }

  // updating the whole user
  @Patch('/update/:id')
  updateTodos(
    @Body() body: UpdateTodoDto,
    @Param('id') id: number,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(id, body);
  }
}
