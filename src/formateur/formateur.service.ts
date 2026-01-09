import { Injectable } from '@nestjs/common';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';

@Injectable()
export class FormateurService {
  create(createFormateurDto: CreateFormateurDto) {
    return 'This action adds a new formateur';
  }

  findAll() {
    return `This action returns all formateur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formateur`;
  }

  update(id: number, updateFormateurDto: UpdateFormateurDto) {
    return `This action updates a #${id} formateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} formateur`;
  }
}
