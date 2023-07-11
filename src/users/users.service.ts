import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService
  ) { };

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.create(dto);
    return createdUser;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async findOne(filter: { where: { name?: string } }): Promise<User> {
    const user = await this.userRepository.findOne({ ...filter });
    return user;
  }

  private async updateById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    for (let key in dto) {
      user[key] = dto[key];
    }
    return user.save();
  }

  async deleteDyId(id: number): Promise<void> {
    const user = await this.findById(id);
    return user.destroy();
  }

  async setRole(id:number, dto:UpdateUserDto): Promise<User>{
    const foundUser = await this.findById(id);
    const foundRole = await this.roleService.findByValue(dto.role)
    if (!foundUser || !foundRole) throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    const updateRoleDto = new UpdateUserDto({role: dto.role});
    return this.updateById( id, updateRoleDto )
  }

}
