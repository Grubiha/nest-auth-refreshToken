import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class ResponseAuthDto{
  @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...", description: 'Authentication Token(accessToken)'})
  readonly accessToken: string;

  @ApiProperty({description: 'Данные пользователя'})
  readonly user: UserDto;
  
  constructor(data = null){
    this.accessToken = data.accessToken;
    this.user = data.user;
  }
}