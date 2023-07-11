import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { TokensModule } from 'src/tokens/tokens.module';
import { GuardsModule } from 'src/guards/guards.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    TokensModule,
    GuardsModule,
    RolesModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
