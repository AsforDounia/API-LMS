// filepath: src/formateur/formateur.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@users/entities/user.entity';
import { Enrollment } from '@src/enrollments/entities/enrollment.entity';
import { Course } from '@src/courses/entities/course.entity';
import { QuizAttempt } from '@src/quizAttempt/schema/quizAttempt.schema';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';

@Injectable()
export class FormateurService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(QuizAttempt.name) private quizAttemptModel: Model<QuizAttempt>,
  ) {}

  // ...existing code...

  // New method for US-7.1: List enrolled learners for trainer's courses
  async getEnrolledLearners(trainerId: string): Promise<any[]> {
    // Get courses taught by the trainer
    const courses = await this.courseModel.find({ teacher: trainerId }).select('_id').lean();
    const courseIds = courses.map(c => c._id);

    // Get enrollments for those courses, populate student details
    const enrollments = await this.enrollmentModel
      .find({ course: { $in: courseIds } })
      .populate('student', 'email firstName lastName')  // Populate student info
      .populate('course', 'title')  // Populate course title
      .lean();

    // Group by learner (student)
    const learnerMap = new Map();
    enrollments.forEach(enrollment => {
      const student = enrollment.student as any;
      if (!learnerMap.has(student._id.toString())) {
        learnerMap.set(student._id.toString(), {
          learnerId: student._id,
          email: student.email,
          firstName: student.firstName,
          lastName: student.lastName,
          enrolledCourses: [],
        });
      }
      learnerMap.get(student._id.toString()).enrolledCourses.push({
        courseId: enrollment.course._id,
        courseTitle: (enrollment.course as any).title,
      });
    });

    return Array.from(learnerMap.values());
  }

  // New method for US-7.2: View progress for a specific learner
  async getLearnerProgress(trainerId: string, learnerId: string): Promise<any> {
    // Ensure the learner is enrolled in trainer's courses
    const enrollments = await this.enrollmentModel
      .find({ student: learnerId })
      .populate({
        path: 'course',
        match: { teacher: trainerId },  // Only trainer's courses
        select: 'title _id',
      })
      .lean();

    const validEnrollments = enrollments.filter(e => e.course);  // Filter valid courses
    if (validEnrollments.length === 0) {
      throw new ForbiddenException('Learner not enrolled in your courses');
    }

    // Aggregate quiz attempts for progress
    const courseIds = validEnrollments.map(e => e.course._id);
    const attempts = await this.quizAttemptModel
      .find({ apprenantId: learnerId })
      .populate({
        path: 'quizId',
        match: { moduleId: { $in: courseIds } },  // Assuming quiz.moduleId links to course (adjust if schema differs)
        select: 'title passingScore moduleId',
      })
      .lean();

    const progress = validEnrollments.map(enrollment => {
      const courseAttempts = attempts.filter(a => (a.quizId as any)?.moduleId?.toString() === enrollment.course._id.toString());
      const completedModules = courseAttempts.filter(a => a.passed).length;  // Infer completion from passed quizzes
      const totalModules = courseAttempts.length;  // Assume one quiz per module
      const quizResults = courseAttempts.map(a => ({
        quizTitle: (a.quizId as any)?.title,
        score: a.score,
        passed: a.passed,
        completedAt: a.completedAt,
      }));

      return {
        courseId: enrollment.course._id,
        courseTitle: (enrollment.course as any).title,
        modulesCompleted: completedModules,
        totalModules,
        quizResults,
      };
    });

    return {
      learnerId,
      progress,
    };
  }
}