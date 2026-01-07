import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UsersModule,
    AuthModule,
    QuizModule,
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}