import { Injectable } from '@nestjs/common';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';

@Injectable()
export class ModuleProgressService {
  create(createModuleProgressDto: CreateModuleProgressDto) {
    return 'This action adds a new moduleProgress';
  }

  findAll() {
    return `This action returns all moduleProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleProgress`;
  }

  update(id: number, updateModuleProgressDto: UpdateModuleProgressDto) {
    return `This action updates a #${id} moduleProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleProgress`;
  }
}
