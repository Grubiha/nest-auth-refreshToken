import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { GuardsModule } from 'src/guards/guards.module';


@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role]),
    GuardsModule    
  ],
  exports: [RolesService]

})
export class RolesModule {}
