// filepath: src/formateur/formateur.module.ts
import { Module } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';
import { UsersModule } from '@src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module'; 
import { QuizModule } from 'src/quiz/quiz.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrollment, EnrollmentSchema } from 'src/enrollments/entities/enrollment.entity';
import { Course, CourseSchema } from 'src/courses/entities/course.entity';
import { QuizAttempt, QuizAttemptSchema } from 'src/quizAttempt/schema/quizAttempt.schema';  

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    EnrollmentsModule,  // New
    QuizModule,  // New
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Course.name, schema: CourseSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
    ]),
  ],
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}