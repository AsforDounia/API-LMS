import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
	@IsNotEmpty()
	@IsMongoId({ each: true })
	student!: Types.ObjectId[];

	@IsNotEmpty()
	@IsMongoId({ each: true })
	course!: Types.ObjectId[];
}
