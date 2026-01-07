import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type ObjectId } from '@common/types/objectid.type';
import { ParseObjectIdPipe } from '@common/pipes';
import { User } from './entities/user.entity';
import { Role } from '@common/enums/role.enum';
import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from '@src/auth';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: User) {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: ObjectId, @CurrentUser() currentUser: User) {
    return this.usersService.remove(id, currentUser);
  }
}
