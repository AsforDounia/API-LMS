import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Module {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  course!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  order!: number;

  @Prop({ required: true })
  moduleType!: string;

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
