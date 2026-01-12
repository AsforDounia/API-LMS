// filepath: src/formateur/formateur.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@users/entities/user.entity';
import { Enrollment } from '@src/enrollments/entities/enrollment.entity';
import { Course } from '@src/courses/entities/course.entity';
import { QuizAttempt } from '@src/quizAttempt/schema/quizAttempt.schema';
import { EnrolledLearnerDto, EnrolledCourseDto } from './dto/enrolled-learner.dto';

@Injectable()
export class FormateurService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(QuizAttempt.name) private quizAttemptModel: Model<QuizAttempt>,
  ) {}

   async getEnrolledLearners(trainerId: string): Promise<EnrolledLearnerDto[]> {
    // 1️⃣ Récupérer les cours du formateur
    const courses = await this.courseModel.find({ teacher: trainerId }).select('_id title').lean();
    if (!courses.length) {
      throw new NotFoundException('No courses found for this teacher.');
    }

    const courseIds = courses.map(c => c._id);

    // 2️⃣ Récupérer les inscriptions pour ces cours
    const enrollments = await this.enrollmentModel
      .find({ course: { $in: courseIds } })
      .populate('student', 'email firstName lastName')
      .populate('course', 'title')
      .lean();

    if (!enrollments.length) {
      return []; // Aucun étudiant inscrit
    }

    // 3️⃣ Grouper les étudiants avec leurs cours
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

      learnerMap.get(student._id.toString()).enrolledCourses.push({
        courseId: course._id.toString(),
        courseTitle: course.title,
      });
    });

    return Array.from(learnerMap.values());
  }

 
}