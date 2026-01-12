import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './entities/enrollment.entity';
import { Model } from 'mongoose';

@Injectable()
export class EnrollmentsService {
    constructor(
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<Enrollment>,
    @InjectModel('User') private readonly userModel: Model<any>,
    @InjectModel('Course') private readonly courseModel: Model<any>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { student, course } = createEnrollmentDto;

    const foundStudent = await this.userModel.exists({ _id: student });
    if (!foundStudent) {
      throw new BadRequestException('Student ID does not exist');
    }

    const foundCourse = await this.courseModel.exists({ _id: course });
    if (!foundCourse) {
      throw new BadRequestException('Course ID does not exist');
    }

    
    const createdEnrollment = new this.enrollmentModel(createEnrollmentDto);
    return createdEnrollment.save();
  }

  findAll() {
    return `This action returns all enrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
