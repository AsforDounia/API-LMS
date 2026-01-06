import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export enum Role {
    ADMIN = 'ADMIN',
    LEARNER = 'LEARNER',
    INSTRUCTOR = 'INSTRUCTOR',
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @Prop({ required: true, select: false })
    password!: string;

    @Prop({ type: String, enum: Role, default: Role.LEARNER })
    role!: Role;

    @Prop({ default: true })
    isActive!: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
