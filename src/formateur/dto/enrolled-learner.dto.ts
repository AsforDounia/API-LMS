// filepath: src/formateur/dto/enrolled-learner.dto.ts
export class EnrolledLearnerDto {
  learnerId: string;
  email: string;
  firstName: string;
  lastName: string;
  enrolledCourses: { courseId: string; courseTitle: string }[];
}