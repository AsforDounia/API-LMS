import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { User } from '@users/entities/user.entity';

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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course , ${updateCourseDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
