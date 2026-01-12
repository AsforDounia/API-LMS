// filepath: src/formateur/dto/learner-progress.dto.ts
export class LearnerProgressDto {
  learnerId: string;
  progress: {
    courseId: string;
    courseTitle: string;
    modulesCompleted: number;
    totalModules: number;
    quizResults: { quizTitle: string; score: number; passed: boolean; completedAt: Date }[];
  }[];
}