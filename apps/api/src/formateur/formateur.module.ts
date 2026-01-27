import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';
import { Enrollment, EnrollmentSchema } from '@src/enrollments/entities/enrollment.entity';
import { Course, CourseSchema } from '@src/courses/entities/course.entity';
import { QuizAttempt, QuizAttemptSchema } from '@src/quizAttempt/schema/quizAttempt.schema';
import { ModuleProgress, ModuleProgressSchema } from '@src/module-progress/entities/module-progress.entity';
import { Module as ModuleEntity, ModuleSchema } from '@src/modules/entities/module.entity'; // ✅ AJOUTÉ

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: Course.name, schema: CourseSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: ModuleProgress.name, schema: ModuleProgressSchema },
      { name: 'Module', schema: ModuleSchema }, // AJOUTÉ
    ]),
  ],
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}