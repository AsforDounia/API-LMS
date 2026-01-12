import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedUsers } from './users.seed';

async function seed() {
  // 1️⃣ Bloquer en production
  if (process.env.NODE_ENV === 'production') {
    console.log('❌ Seed disabled in production');
    process.exit(0);
  }

  // 2️⃣ Créer le contexte NestJS
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 User seeding started...');

    // 3️⃣ SEED USERS UNIQUEMENT
    const users = await seedUsers(app);

    console.log(`✅ ${users.length} users seeded`);
  } catch (error) {
    console.error('❌ User seeding failed:', error);
  } finally {
    // 4️⃣ Fermer l'app
    await app.close();
  }
}

// 5️⃣ Lancer
seed();
