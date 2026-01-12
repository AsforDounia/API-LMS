import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';
import { InjectModel as InjectCourseModel } from '@nestjs/mongoose';
import { type ObjectId } from '@src/common/types/objectid.type';
import { User } from '@src/users/entities/user.entity';
import { Role } from '@src/common/enums/role.enum';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectCourseModel('Course') private readonly courseModel: Model<any>,
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    // Validate all course IDs exist
    const courseId = createModuleDto.course;
    const foundCourse = await this.courseModel.findOne({ _id: courseId, deletedAt: { $exists: false } }).exec();
    if (foundCourse) {
      throw new BadRequestException('The course ID do not exist');
    }
    const createdModule = new this.moduleModel(createModuleDto);
    return createdModule.save();
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Module | null> {
    return this.moduleModel.findById(id).exec();
  }

  async update(id: ObjectId, updateModuleDto: UpdateModuleDto, user: User): Promise<Module | null> {
    const module = await this.moduleModel.findById(id);
    if (!module) {
      throw new Error('Module not found');
    }
    // Assume module.course is the course ObjectId
    const course = await this.courseModel.findById(module.course);
    if (!course) {
      throw new Error('Related course not found');
    }
    const isTeacher = course.teacher?.toString() === user._id.toString();
    const isAdmin = user.role === Role.ADMIN;
    if (!isTeacher && !isAdmin) {
      throw new ForbiddenException('You are not authorized to update this module');
    }
    if(isAdmin && !isTeacher){
      if (
        updateModuleDto.title !== undefined ||
        updateModuleDto.description !== undefined ||
        updateModuleDto.order !== undefined ||
        updateModuleDto.moduleType !== undefined ||
        updateModuleDto.course !== undefined
      ) {
        throw new ForbiddenException(
          'Admins cannot update personal module fields (course, title, description, order, moduleType)',
        );
      }
    }
    return this.moduleModel.findByIdAndUpdate(id, { $set: updateModuleDto }, { new: true }).exec();
  }

  async remove(id: ObjectId, user: User): Promise<{ deleted: boolean; module: Module | null }> {
    const module = await this.moduleModel.findById(id);
    if (!module) {
      throw new Error('Module not found');
    }
    // Assume module.course is the course ObjectId
    const course = await this.courseModel.findById(module.course);
    if (!course) {
      throw new Error('Related course not found');
    }
    const isTeacher = course.teacher?.toString() === user._id.toString();
    const isAdmin = user.role === Role.ADMIN;
    if (!isTeacher && !isAdmin) {
      throw new ForbiddenException('You are not authorized to delete this module');
    }
    await this.moduleModel.updateOne({ _id: id }, { deletedAt: new Date() });
    const deletedModule = await this.moduleModel.findById(id);
    return { deleted: true, module: deletedModule };
  }
}
