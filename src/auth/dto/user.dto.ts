import { ApiProperty } from "@nestjs/swagger";

export class UserDto{
  @ApiProperty({example: "1", description: 'Уникальный идентификатор пользователя'})
  readonly id:number;

  @ApiProperty({example: 'grubina', description: 'Уникальное имя пользователя'})
  readonly name:string;

  @ApiProperty({example: 'USER', description: 'Роль пользователя'})
  readonly role: string;
  
  constructor(data = null){
    this.id = data.id;
    this.name = data.name;
    this.role = data.role;
  }
}