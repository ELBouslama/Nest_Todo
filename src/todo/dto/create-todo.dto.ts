import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  //check class-validator pour trouver tous les annotations
  //if status code 400 --> errors
  @IsNotEmpty()
  // utilisation d'arrow function()=> avec ValidationArgument ou la methode ci-dessous .
  @MinLength(3, {
    message:
      "$property est invalide la taille doit etre d'au moins $constraint1 caracteres",
  })
  @MaxLength(10, {
    message:
      "$property est invalide la taille doit etre d'au plus $constraint1 caracteres",
  })
  @IsString() 
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  @IsString()
  description: string;
}
