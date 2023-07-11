import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { RefreshToken } from "../tokens/token.model";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreateAttrs{
  name:string;
  password:string;
  role?:string;
};

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'grubina', description: 'Уникальное имя пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string;
  
  @ApiProperty({example: '$2b$05$3y0iPqx/SpSM...', description: 'Зашифрованный пароль'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'USER', description: 'Роль пользователя'})
  @Column({type: DataType.STRING, defaultValue: 'USER'})
  role: string

  @HasOne(()=> RefreshToken)
  RefreshToken: RefreshToken

}