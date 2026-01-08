import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SINGLE_CHOICE = 'single_choice',
  TRUE_FALSE = 'true_false',
}

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;

  @Prop({ required: true })
  questionText: string;

  @Prop({
    type: String,
    enum: QuestionType,
    required: true,
  })
  type: QuestionType;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  points: number;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);