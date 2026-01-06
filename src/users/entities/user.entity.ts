import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

@Schema({ timestamps: true })
export class User extends Document {
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

  @Prop({ default: null })
  deletedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
