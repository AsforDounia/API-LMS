import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class QuizAttempt extends Document {
  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  passed: boolean;

  @Prop({ required: true })
  attemptNumber: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  apprenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;
}

export const QuizAttemptSchema = SchemaFactory.createForClass(QuizAttempt);