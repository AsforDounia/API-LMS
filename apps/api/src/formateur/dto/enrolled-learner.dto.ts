export class EnrolledCourseDto {
  courseId: string;
  courseTitle: string;
}

export class EnrolledLearnerDto {
  learnerId: string;
  email: string;
  firstName: string;
  lastName: string;
  enrolledCourses: EnrolledCourseDto[];
}
