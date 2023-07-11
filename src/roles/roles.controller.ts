import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDecorator } from '../guards/decorators/role-auth.decorator';
import { RoleGuard } from '../guards/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@RoleDecorator('DEVELOPER')
@UseGuards(RoleGuard)

@ApiTags('ROLES')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService){}

  @ApiOperation({summary: 'Создание роли'})
  @ApiResponse({status: 200, type: Role})

  @Post()
  create(@Body() dto: CreateRoleDto) {
      return this.roleService.createRole(dto);
  }


  @ApiOperation({summary: 'Найти все роли'})
  @ApiResponse({status: 200, type: Role})

  @Get()
  getAll() {
      return this.roleService.findAll();
  }


  @ApiOperation({summary: 'Найти роль по значению'})
  @ApiResponse({status: 200, type: Role})

  @Get('/:value')
  getByValue(@Param('value') value: string) {
      return this.roleService.findByValue(value);
  }
  
}
