import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    const createdModule = new this.moduleModel(createModuleDto);
    return createdModule.save();
  }

  findAll() {
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module ${updateModuleDto} `;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
