import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from '@src/enrollments/entities/enrollment.entity';
import { Course } from '@src/courses/entities/course.entity';
import { QuizAttempt } from '@src/quizAttempt/schema/quizAttempt.schema';
import { EnrolledLearnerDto } from './dto/enrolled-learner.dto';

@Injectable()
export class FormateurService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>,

    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,

    @InjectModel(QuizAttempt.name)
    private readonly quizAttemptModel: Model<QuizAttempt>,
  ) {}
 async getMyCourses(teacherId: string): Promise<Course[]> {
  const courses = await this.courseModel
    .find({ teacher: teacherId })
    .select('_id title description createdAt')
    .lean();

  if (!courses.length) {
    throw new NotFoundException('No courses found for this teacher');
  }

  return courses;
}

  
  private async validateCourseOwnership(
    courseId: string,
    teacherId: string,
  ): Promise<void> {
    const course = await this.courseModel.findById(courseId).lean();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacher.toString() !== teacherId) {
      throw new ForbiddenException(
        'You are not allowed to access this course',
      );
    }
  }

  
  async getEnrolledLearners(
    trainerId: string,
  ): Promise<EnrolledLearnerDto[]> {
    
    const courses = await this.courseModel
      .find({ teacher: trainerId })
      .select('_id title')
      .lean();

    if (!courses.length) {
      throw new NotFoundException(
        'No courses found for this teacher',
      );
    }

    const courseIds = courses.map(course => course._id);

    // Récupérer les inscriptions
    const enrollments = await this.enrollmentModel
      .find({ course: { $in: courseIds } })
      .populate('student', 'email firstName lastName')
      .populate('course', 'title')
      .lean();

    if (!enrollments.length) {
      return [];
    }

    //  Grouper par étudiant
    const learnerMap = new Map<string, EnrolledLearnerDto>();

    enrollments.forEach(enrollment => {
      const student = enrollment.student as any;
      const course = enrollment.course as any;

      if (!learnerMap.has(student._id.toString())) {
        learnerMap.set(student._id.toString(), {
          learnerId: student._id.toString(),
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          enrolledCourses: [],
        });
      }

      learnerMap.get(student._id.toString())!.enrolledCourses.push({
        courseId: course._id.toString(),
        courseTitle: course.title,
      });
    });

    return Array.from(learnerMap.values());
  }

  /**
   *  Get students by ONE course (restricted)
   */
  async getStudentsByCourse(
    courseId: string,
    teacherId: string,
  ) {
    // 🔐 Ownership check
    await this.validateCourseOwnership(courseId, teacherId);

    return this.enrollmentModel
      .find({ course: courseId })
      .populate('student', 'email firstName lastName')
      .lean();
  }
}
