import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './entities/course.entity';
import {
  Module as ModuleEntity,
  ModuleSchema,
} from '@src/modules/entities/module.entity';
import {
  ModuleProgress,
  ModuleProgressSchema,
} from '@src/module-progress/entities/module-progress.entity';
import {
  Enrollment,
  EnrollmentSchema,
} from '@src/enrollments/entities/enrollment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: ModuleEntity.name, schema: ModuleSchema },
      { name: ModuleProgress.name, schema: ModuleProgressSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
