import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';

@Controller('module-progress')
export class ModuleProgressController {
  constructor(private readonly moduleProgressService: ModuleProgressService) {}

  @Post()
  create(@Body() createModuleProgressDto: CreateModuleProgressDto) {
    return this.moduleProgressService.create(createModuleProgressDto);
  }

  @Get()
  findAll() {
    return this.moduleProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleProgressDto: UpdateModuleProgressDto) {
    return this.moduleProgressService.update(+id, updateModuleProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleProgressService.remove(+id);
  }
}
