import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { CreateRefreshTokenDto } from '../tokens/dto/create-refreshToken.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService
  ) { }

  private async setTokens(dto: UserDto): Promise<{ accessToken: string, refreshToken: string, user: UserDto }> {
    const tokens = await this.tokensService.generateTokens(dto);
    const createRefreshTokenDto = new CreateRefreshTokenDto({ refreshToken: tokens.refreshToken, userId: dto.id });
    await this.tokensService.saveRefreshToken(createRefreshTokenDto);
    return { ...tokens, user: dto };
  }

  async registration(dto: AuthDto): Promise<{ accessToken: string, refreshToken: string, user: UserDto }> {
    const foundUser = await this.usersService.findOne({ where: { name: dto.name } });
    if (foundUser) throw new HttpException('Пользователь с таким именем уже существует', HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.create({ ...dto, password: hashPassword });

    const userDto = new UserDto(user);
    return this.setTokens(userDto);
  }

  async login(dto: AuthDto): Promise<{ accessToken: string, refreshToken: string, user: UserDto }> {
    const foundUser = await this.usersService.findOne({ where: { name: dto.name } });
    if (!foundUser) throw new HttpException('Некорректное имя или пароль', HttpStatus.BAD_REQUEST);

    const passwordEquals = await bcrypt.compare(dto.password, foundUser.password);
    if (!passwordEquals) throw new HttpException('Некорректное имя или пароль', HttpStatus.BAD_REQUEST);

    const userDto = new UserDto(foundUser);
    return this.setTokens(userDto);
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string, refreshToken: string, user: UserDto }> {
    const userData = await this.tokensService.validateRefreshToken(refreshToken);
    if (!userData) throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
    const foundToken = await this.tokensService.find({where: {refreshToken}});
    if (!foundToken) throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
    const userDto = new UserDto(userData);
    return this.setTokens(userDto);
  }

  async logout(refreshToken: string): Promise<void> {
    return this.tokensService.delete(refreshToken);
  }
}
