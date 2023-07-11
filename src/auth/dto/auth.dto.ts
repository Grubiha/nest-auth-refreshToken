import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class AuthDto extends PickType(CreateUserDto, ['name','password'] as const){}
// export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}