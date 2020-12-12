import { TodoStatusEnum } from '../enums/todos-status.enum';
import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string;
  name: string;
  description: string;
  status: TodoStatusEnum;

  constructor(
    id: string = uuidv4(),
    name: string = '',
    description: string = '',
    status: TodoStatusEnum = TodoStatusEnum.waiting
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
  }
}
