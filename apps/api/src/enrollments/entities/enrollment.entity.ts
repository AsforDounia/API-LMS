import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  student!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course!: Types.ObjectId;

  @Prop({ default: Date.now })
  deletedAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
