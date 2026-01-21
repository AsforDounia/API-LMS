import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';
import { InjectModel as InjectCourseModel } from '@nestjs/mongoose';
import { type ObjectId } from '@src/common/types/objectid.type';
import { User } from '@src/users/entities/user.entity';
import { Role } from '@src/common/enums/role.enum';
import { ModuleProgress } from '../module-progress/entities/module-progress.entity';
import { Course } from '@src/courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectCourseModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel(ModuleProgress.name) private readonly moduleProgressModel: Model<ModuleProgress>, // AJOUTE ICI
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    // Validate all course IDs exist
    const courseId = createModuleDto.course;
    const foundCourse = await this.courseModel.findOne({
      _id: courseId,
      $or: [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ]
    }).exec();
    if (!foundCourse) {
      throw new BadRequestException('The course ID does not exist');
    }
    const createdModule = new this.moduleModel(createModuleDto);
    return createdModule.save();
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel.find().exec();
  }

  async findByTeacher(teacherId: ObjectId): Promise<Module[]> {
    const courses = await this.courseModel.find({
      teacher: teacherId,
      $or: [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ]
    }).select('_id').exec();
    const courseIds = courses.map(c => c._id);
    const modules = await this.moduleModel.find({
      course: { $in: courseIds },
            $or: [
        { deletedAt: { $exists: false } },
        { deletedAt: null }
      ]
    }).populate('course').exec();
    return modules
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

  async canAccessModule(apprenantId: Types.ObjectId, moduleId: Types.ObjectId): Promise<boolean> {
    const module = await this.moduleModel.findById(moduleId);
    if (!module) throw new NotFoundException('Module not found');

    const modules = await this.moduleModel.find({
      course: module.course,
      isPublished: true,
      deletedAt: null,
    }).sort({ order: 1 }).exec();

    const currentIndex = modules.findIndex(m => m._id.equals(moduleId));
    if (currentIndex === -1) throw new NotFoundException('Module not found in course');

    for (let i = 0; i < currentIndex; i++) {
      const progress = await this.moduleProgressModel.findOne({
        apprenantId,
        moduleId: modules[i]._id,
      });
      if (!progress || progress.status !== 'completed') {
        return false;
      }
    }
    return true;
  }

  async accessModule(apprenantId: Types.ObjectId, moduleId: Types.ObjectId) {
    const canAccess = await this.canAccessModule(apprenantId, moduleId);
    if (!canAccess) {
      throw new ForbiddenException('Module locked: prerequisites not completed');
    }
    
    return { success: true, message: 'Module accessible', module: await this.findOne(moduleId) };
  }

 
  async unlockNextModule(apprenantId: Types.ObjectId, moduleId: Types.ObjectId) {
    const module = await this.moduleModel.findById(moduleId);
    if (!module) return;

    const nextModule = await this.moduleModel.findOne({
      course: module.course,
      order: module.order + 1,
      isPublished: true,
      deletedAt: null,
    });

    if (nextModule) {
      await this.moduleProgressModel.updateOne(
        { apprenantId, moduleId: nextModule._id },
        { $set: { isLocked: false } },
        { upsert: true }
      );
    }
  }
}
