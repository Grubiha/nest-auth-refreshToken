import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from './dto/tokens.dto';
import { RefreshToken } from './token.model';
import { CreateRefreshTokenDto } from './dto/create-refreshToken.dto';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(RefreshToken) private refreshTokenRepository: typeof RefreshToken,
    private jwtService: JwtService
  ) { }

  async generateTokens(payload: UserDto): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ ...payload }, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRE + 'm'
      }),
      this.jwtService.signAsync({ ...payload }, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRE + 'd'
      }),
    ])
    return new Tokens({ accessToken, refreshToken })
  }

  async find(filter: { where: { userId?: number, refreshToken?: string } }): Promise<RefreshToken> {
    const token = await this.refreshTokenRepository.findOne(filter);
    return token;
  }

  async delete(refreshToken: string): Promise<void> {
    const foundToken = await this.find({ where: { refreshToken } });
    return foundToken.destroy();
  }

  async saveRefreshToken(dto: CreateRefreshTokenDto): Promise<RefreshToken> {
    const foundToken = await this.find({ where: { userId: dto.userId } })
    if (foundToken) {
      foundToken.refreshToken = dto.refreshToken;
      return foundToken.save()
    }
    const token = await this.refreshTokenRepository.create(dto);
    return token;
  }

  async validateRefreshToken(token: string): Promise<UserDto> {
    if (!token) {
      return null;
    }
    try {
      const userData = await this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
      return new UserDto(userData);
    } catch (e) {
      return null;
    }
  }

}
