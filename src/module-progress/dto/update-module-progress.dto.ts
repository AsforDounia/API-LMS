import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleProgressDto } from './create-module-progress.dto';

export class UpdateModuleProgressDto extends PartialType(CreateModuleProgressDto) {}
