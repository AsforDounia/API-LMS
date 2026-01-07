import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module'; 
import { QuestionModule } from './question/question.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/lms'), 
    QuizModule,
    QuestionModule

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
