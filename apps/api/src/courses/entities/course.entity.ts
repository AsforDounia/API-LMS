import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: false })
    isPublished: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    instructor: User;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
