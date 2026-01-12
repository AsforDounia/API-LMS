import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../users/schemas/user.schema';
import { Role } from '../common/enums/role.enum';

/**
 * Seed USERS
 * - insert many users
 * - hash passwords
 * - avoid duplicates
 * - return all seeded users
 */
export async function seedUsers(app): Promise<User[]> {
const userModel: Model<User> = app.get(getModelToken(User.name));


  // 1️⃣ USERS À INSÉRER
  const USERS = [
    {
      email: 'admin@test.com',
      password: '123456',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
    },
    {
      email: 'teacher1@test.com',
      password: '123456',
      firstName: 'Teacher',
      lastName: 'One',
      role: Role.TEACHER,
    }, {
      email: 'teacher3@test.com',
      password: '123456',
      firstName: 'Teacher',
      lastName: 'three',
      role: Role.TEACHER,
    },
    {
      email: 'teacher2@test.com',
      password: '123456',
      firstName: 'Teacher',
      lastName: 'Two',
      role: Role.TEACHER,
    },
    {
      email: 'student1@test.com',
      password: '123456',
      firstName: 'Student',
      lastName: 'One',
      role: Role.STUDENT,
    }, {
      email: 'student1@test.com',
      password: '123456',
      firstName: 'Student',
      lastName: 'One',
      role: Role.STUDENT,
    },
    {
      email: 'student2@test.com',
      password: '123456',
      firstName: 'Student',
      lastName: 'Two',
      role: Role.STUDENT,
    },
    {
      email: 'student3@test.com',
      password: '123456',
      firstName: 'Student',
      lastName: 'Two',
      role: Role.STUDENT,
    },{
      email: 'student4@test.com',
      password: '123456',
      firstName: 'Student',
      lastName: 'Two',
      role: Role.STUDENT,
    },
  ];

  // 2️⃣ CHERCHER LES USERS EXISTANTS
  const existingUsers = await userModel.find({
    email: { $in: USERS.map(u => u.email) },
  });

  const existingEmails = existingUsers.map(u => u.email);

  // 3️⃣ FILTRER + HASH PASSWORD
  const usersToInsert = await Promise.all(
    USERS
      .filter(user => !existingEmails.includes(user.email))
      .map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
  );

  // 4️⃣ INSERTION EN MASSE
  if (usersToInsert.length > 0) {
    await userModel.insertMany(usersToInsert);
    console.log(`✅ ${usersToInsert.length} users inserted`);
  } else {
    console.log('ℹ️ No new users to insert');
  }

  // 5️⃣ RETOURNER TOUS LES USERS SEEDÉS
  return await userModel.find({
    email: { $in: USERS.map(u => u.email) },
  });
}
