import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './token.model';

@Module({
  providers: [TokensService],
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([RefreshToken])
  ],
  exports: [TokensService]
})
export class TokensModule {}
