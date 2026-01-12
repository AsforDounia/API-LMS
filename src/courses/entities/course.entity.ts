import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  teacher!: Types.ObjectId;

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
