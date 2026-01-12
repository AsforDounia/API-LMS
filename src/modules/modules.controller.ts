import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@src/common/pipes';
import { type ObjectId } from '@src/common/types/objectid.type';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from '@src/auth';
import { Role } from '@src/common/enums/role.enum';
import { User } from '@src/users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateModuleDto: UpdateModuleDto,
    @CurrentUser() user: User,
  ) {
    return this.modulesService.update(id, updateModuleDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @CurrentUser() user: User,
  ) {
    return this.modulesService.remove(id, user);
  }
}
