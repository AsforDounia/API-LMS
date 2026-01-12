import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import type { ObjectId } from '@common/types/objectid.type';
import { User } from '@users/entities/user.entity';
import { Role } from '@src/common/enums/role.enum';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto, user: User): Promise<Course> {
    const course = new this.courseModel({
      title: createCourseDto.title,
      description: createCourseDto.description,
      teacher: user._id,
      isPublished: createCourseDto.isPublished ?? false,
    });
    return course.save();
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(id: ObjectId, updateCourseDto: UpdateCourseDto, user: User): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    // Allow teacher or admin to update
    const isTeacher = course.teacher.toString() === user._id.toString();
    const isAdmin = user.role === Role.ADMIN;
    if (!isTeacher && !isAdmin) {
      throw new ForbiddenException('You are not authorized to update this course');
    }

    if (isAdmin && !isTeacher) {
      if (
        updateCourseDto.title !== undefined ||
        updateCourseDto.description !== undefined
      ) {
        throw new ForbiddenException(
          'Admins cannot update personal course fields (title, description)',
        );
      }
    }
    Object.assign(course, updateCourseDto);
    return course.save();
  }

  async remove(id: ObjectId, user: User): Promise<{ deleted: boolean; course: Course | null }> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    // Allow teacher or admin to remove
    const isTeacher = course.teacher.toString() === user._id.toString();
    const isAdmin = user.role === Role.ADMIN;
    if (!isTeacher && !isAdmin) {
      throw new ForbiddenException('You are not authorized to delete this course');
    }
    // Soft delete: set deletedAt
    await this.courseModel.updateOne({ _id: id }, { deletedAt: new Date() });
    // Return the course data (with deletedAt set)
    const deletedCourse = await this.courseModel.findById(id);
    return { deleted: true, course: deletedCourse };
  }
}
