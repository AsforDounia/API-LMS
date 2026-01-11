import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';
import { InjectModel as InjectCourseModel } from '@nestjs/mongoose';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectCourseModel('Course') private readonly courseModel: Model<any>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    // Validate all course IDs exist
    const courseIds = createModuleDto.courses;
    const foundCourses = await this.courseModel.find({ _id: { $in: courseIds } }).select('_id').lean();
    if (foundCourses.length !== courseIds.length) {
      throw new BadRequestException('One or more course IDs do not exist');
    }
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
