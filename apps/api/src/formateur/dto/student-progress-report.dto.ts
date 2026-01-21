// filepath: src/formateur/dto/student-progress-report.dto.ts

export class ModuleProgressDto {
  moduleId: string;
  moduleTitle: string;
  completionPercentage: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt?: Date;
}

export class QuizResultDto {
  quizId: string;
  quizTitle: string;
  moduleTitle: string;
  score: number;
  passingScore: number;
  percentage: number;
  attemptNumber: number;
  attemptedAt: Date;
  completedAt?: Date;
  passed: boolean;
}

export class StudentProgressReportDto {
  studentId: string;
  studentEmail: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  overallProgress: number;
  moduleProgress: ModuleProgressDto[];
  quizResults: QuizResultDto[];
  totalQuizzesTaken: number;
  totalQuizzesPassed: number;
  averageQuizScore: number;
  enrolledAt: Date;
  lastActivityAt?: Date;
}
