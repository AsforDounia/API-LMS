import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ type: [String], required: true })
  selectedAnswers: string[];

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop({ required: true })
  pointsEarned: number;

  @Prop({ type: Types.ObjectId, ref: 'QuizAttempt', required: true })
  attemptId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);