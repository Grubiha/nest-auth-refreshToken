import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto{
  @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли'})
  @IsString({message: 'Должно быть строкой'})
  readonly value: string;
  @ApiProperty({example: 'Все разрешения', description: 'Разрешенные эндпоинты'})
  @IsString({message: 'Должно быть строкой'})
  readonly description: string;
}