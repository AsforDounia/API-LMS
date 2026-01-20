import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

  create(createCourseDto: CreateCourseDto) {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  findAll() {
    return this.courseModel.find().populate('instructor', 'firstName lastName _id').exec();
  }

  findOne(id: string) {
    return this.courseModel.findById(id).populate('instructor', 'firstName lastName _id').exec();
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
