import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { TodoStatusEnum } from "../enums/todos-status.enum";

export class StatusCritereDto{
    @IsNotEmpty()
    chaine: string;
    
    @IsNotEmpty()
    @IsIn([
        TodoStatusEnum.waiting,
        TodoStatusEnum.done,
        TodoStatusEnum.actif
    ],{
        message:`Le status est invalide`
    })
    status: TodoStatusEnum;
}