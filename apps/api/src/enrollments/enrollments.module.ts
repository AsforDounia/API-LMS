import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from '@src/courses/entities/course.entity';
import { UserSchema } from '@src/users/entities/user.entity';
import { Enrollment, EnrollmentSchema } from './entities/enrollment.entity';
import { ModuleSchema } from '@src/modules/entities/module.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Enrollment.name, schema: EnrollmentSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Module', schema: ModuleSchema },
    ])
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
