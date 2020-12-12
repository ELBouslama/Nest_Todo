import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FirstpipePipe } from 'src/pipes/firstpipe.pipe';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('')
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Post('/create')
  makeTodos(@Body(FirstpipePipe) newTodo: CreateTodoDto ) {
    return this.todoService.createTodo(newTodo);
  }

  @Delete('/delete/:id')
  deleteTodos(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
  // updating only one of the attributs of a todo

  @Put('/update/:id')
  updateTodosAll(@Body() newTodo: UpdateTodoDto, @Param('id') id) {
    return this.todoService.updateTodo(id, newTodo);
  }

  // updating the whole user
  @Patch('/update/:id')
  updateTodos(@Body() body, @Param('id') id: string) {
    this.todoService.updateTodo(id, body);
  }
} 
