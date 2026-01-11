// filepath: src/formateur/formateur.module.ts
import { Module } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';
import { UsersModule } from '@src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module'; 
import { QuizModule } from 'src/quiz/quiz.module'; 
import { QuizAttemptModule } from 'src/quizAttempt/quizAttempt.module';  

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    EnrollmentsModule,  // New
    QuizModule,  // New
    QuizAttemptModule,  // New
  ],
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}