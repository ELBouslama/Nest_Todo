import { Timestamp } from 'src/generics/timestamp';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatusEnum } from '../enums/todos-status.enum';

@Entity('todo')
export class TodoEntity extends Timestamp{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;


}
