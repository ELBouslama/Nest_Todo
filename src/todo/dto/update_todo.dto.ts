import { IsIn, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../enums/todos-status.enum';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends CreateTodoDto {
  @IsIn([TodoStatusEnum.actif, TodoStatusEnum.done, TodoStatusEnum.waiting], {
    message: 'le status doit etre soit actif,waiting,done',
  })
  @IsOptional()
  status: TodoStatusEnum;
}
