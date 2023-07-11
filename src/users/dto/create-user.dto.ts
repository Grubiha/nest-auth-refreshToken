import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto{
  @ApiProperty({example: 'grubina', description: 'Уникальное имя пользователя'})
  @IsString({message: 'Должно быть строкой'})
  readonly name:string;

  @ApiProperty({example: '123', description: 'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4,16, {message: 'Не меньше 4 и не больше 16'})
  readonly password:string;

  @ApiProperty({example: 'USER', description: 'Роль пользователя', required:false})
  @IsString({message: 'Должно быть строкой'})
  readonly role?: string;
  
  constructor(data = null){
    this.name = data?.name;
    this.password = data?.password;
    this.role = data?.role;
  }
}