import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { Role } from '../common/enums/role.enum';
import { BCRYPT_ROUNDS } from '../common/constants';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const courseModel = app.get<Model<Course>>(getModelToken(Course.name));

  console.log('🌱 Seeding database...');

  // Clear existing data
  await userModel.deleteMany({});
  await courseModel.deleteMany({});
  console.log('Cleared existing users and courses.');

  // Create hashed password
  const hashedPassword = await bcrypt.hash('password123', BCRYPT_ROUNDS);

  // Create Admin
  const admin = await userModel.create({
    email: 'admin@lms.com',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'User',
    role: Role.ADMIN,
  });
  console.log('Created Admin: admin@lms.com');

  // Create Instructors
  const instructors: any[] = [];
  for (let i = 0; i < 5; i++) {
    const instructor = await userModel.create({
      email: faker.internet.email(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: Role.TEACHER,
    });
    instructors.push(instructor);
  }
  console.log('Created 5 Instructors');

  // Create specific test users
  const student = await userModel.create({
    email: 'student@lms.com',
    password: hashedPassword,
    firstName: 'Student',
    lastName: 'User',
    role: Role.STUDENT,
  });
  console.log('Created Student: student@lms.com');

  const teacher = await userModel.create({
    email: 'teacher@lms.com',
    password: hashedPassword,
    firstName: 'Teacher',
    lastName: 'User',
    role: Role.TEACHER,
  });
  console.log('Created Teacher: teacher@lms.com');

  // Create users for deletion testing
  for (let i = 1; i <= 3; i++) {
    await userModel.create({
      email: `delete-me-${i}@lms.com`,
      password: hashedPassword,
      firstName: `DeleteMe${i}`,
      lastName: 'User',
      role: Role.STUDENT,
    });
  }
  console.log('Created 3 Users for deletion testing');

  // Create Students
  for (let i = 0; i < 5; i++) {
    await userModel.create({
      email: faker.internet.email(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: Role.STUDENT,
    });
  }
  console.log('Created 5 Random Students');

  // Create Courses
  for (const instructor of instructors) {
    for (let i = 0; i < 3; i++) {
      await courseModel.create({
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        teacher: instructor._id,
        isPublished: faker.datatype.boolean(),
      });
    }
  }
  console.log('Created 15 Courses');

  console.log('✅ Seeding complete!');
  await app.close();
}

bootstrap();
