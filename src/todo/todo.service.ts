import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { Equal, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCritereDto } from './dto/statuscritere-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  constructor(
    @InjectRepository(TodoEntity)
    private readonly TodoRepository: Repository<TodoEntity>,
  ) {
    const todo = new Todo();
    todo.name = 'Sport';
    todo.description = 'Faire du Sport';
    this.todos = [todo];
  }

  private fakefindTodoById(id: string): Todo {
    const todo = this.todos.find(actualTodo => {
      if (actualTodo.id === id) return actualTodo;
    });
    if (todo) return todo;
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  async findAllTodos(): Promise<TodoEntity[]> {
    return await this.TodoRepository.find();
  }

  async findTodoById(id: number) {
    const todos = await this.TodoRepository.find({id});
    if (todos[0]) return todos[0];
    throw new NotFoundException(`Le todo d'id ${id} n'est pas disponible`);
  }

  fakecreateTodo(newTodo: CreateTodoDto): Todo {
    const { name, description } = newTodo;
    const todo = new Todo();
    todo.name = name;
    todo.description = description;

    this.todos.push(todo);
    return todo;
  }

  async createTodo(newTodo: CreateTodoDto): Promise<TodoEntity> {
    const todo = this.TodoRepository.create(newTodo);
    return await this.TodoRepository.save(todo);
  }
/* 
  deleteFakeTodo(id: string): Todo[] {
    const todo = this.findTodoById(id);

    this.todos.splice(this.todos.indexOf(todo), 1);
    return this.todos;
  } */

  async deleteTodo(id: number) {
    return await this.TodoRepository.softDelete(id);
  }

  async restoreTodo(id: string) {
    return await this.TodoRepository.restore(id);
  }

  async updateTodo(id: number, newTodo: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.TodoRepository.preload({
      id: id,
      ...newTodo,
    });

    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas `);
    }

    return await this.TodoRepository.save(todo);
  }

  async searchTodo(statuscritereTodo: StatusCritereDto) {
    const todos = await this.TodoRepository.find({
      description: Like(`%${statuscritereTodo.chaine}%`),
      status: Equal(statuscritereTodo.status),
    });
    if (!todos) {
      throw new NotFoundException(`Le todo avec ce critére n'existe pas`);
    }

    return todos;
  }
}
