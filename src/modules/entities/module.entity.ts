import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";

export enum ContentType {
    VIDEO = 'VIDEO',
    PDF = 'PDF',
    TEXT = 'TEXT',
}

@Schema({ timestamps: true })
export class Module {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
    course!: Types.ObjectId;

    @Prop({ required: true, trim: true })
    title!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ type: String, enum: ContentType, required: true })
    contentType!: ContentType;

    @Prop({ required: true })
    contentUrl!: string;

    @Prop({ required: true, default: 0 })
    position!: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quiz' })
    quiz?: Types.ObjectId;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
