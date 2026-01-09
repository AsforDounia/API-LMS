import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';

@Controller('formateur')
export class FormateurController {
  constructor(private readonly formateurService: FormateurService) {}

  @Post()
  create(@Body() createFormateurDto: CreateFormateurDto) {
    return this.formateurService.create(createFormateurDto);
  }

  @Get()
  findAll() {
    return this.formateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formateurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormateurDto: UpdateFormateurDto) {
    return this.formateurService.update(+id, updateFormateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formateurService.remove(+id);
  }
}
