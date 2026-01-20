import { IsEnum, IsMongoId, IsNumber, IsBoolean } from 'class-validator';
import { ProgressStatus } from '../entities/module-progress.entity';

export class CreateModuleProgressDto {
	@IsMongoId()
	apprenantId: string;

	@IsMongoId()
	enrollmentId: string;

	@IsNumber()
	progressPercentage: number;

	@IsEnum(ProgressStatus)
	status: ProgressStatus;

	@IsBoolean()
	isLocked: boolean;
}
