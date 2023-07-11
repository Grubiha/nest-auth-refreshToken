import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface CreateTokenAttr{
  refreshToken: string;
  userId: number
}

@Table({tableName: 'refreshToken'})
export class RefreshToken extends Model<RefreshToken, CreateTokenAttr>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING})
  refreshToken: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}