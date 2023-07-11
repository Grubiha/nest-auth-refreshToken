import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from '../guards/guards/jwt-auth.guard';
import { RoleDecorator } from '../guards/decorators/role-auth.decorator';
import { RoleGuard } from '../guards/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@ApiTags('USERS')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Найти пользователя по ID' })
  @ApiResponse({ status: 200, type: User })

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }


  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiResponse({ status: 200 })

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.usersService.deleteDyId(id);
  }


  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })

  @RoleDecorator('ADMIN')
  @UseGuards(RoleGuard)

  @Patch('/:id')
  setRole(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.setRole(id, dto);
  }

}
