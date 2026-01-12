import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types, Document } from 'mongoose';

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  LOCKED = 'locked',
}

@Schema({ timestamps: true })
export class ModuleProgress extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  apprenantId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Module', required: true })
  moduleId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Enrollment', required: true })
  enrollmentId!: Types.ObjectId;

  @Prop({ enum: ProgressStatus, default: ProgressStatus.NOT_STARTED })
  status!: ProgressStatus;

  @Prop({ default: 0 })
  progressPercentage!: number;

  @Prop({ default: true })
  isLocked!: boolean;

  @Prop()
  startedAt?: Date;

  @Prop()
  completedAt?: Date;
}

export const ModuleProgressSchema = SchemaFactory.createForClass(ModuleProgress);
