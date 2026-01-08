import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";

@Schema({ _id: false })
export class Question {
    @Prop({ required: true })
    questionText!: string;

    @Prop({ type: [String], required: true })
    options!: string[];

    @Prop({ required: true, select: false })
    correctAnswer!: string;
}

const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class Quiz {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Module', required: true })
    module!: Types.ObjectId;

    @Prop({ type: [QuestionSchema], required: true })
    questions!: Question[];

    @Prop({ default: 70 })
    passingThreshold!: number;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);