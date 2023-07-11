import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { RefreshToken } from './tokens/token.model';
import { TokensModule } from './tokens/tokens.module';
import { GuardsModule } from './guards/guards.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, RefreshToken],
      autoLoadModels: true,
    }),
    UsersModule,
    TokensModule,
    AuthModule,
    GuardsModule,
    RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
