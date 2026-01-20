import { Controller, Post, Body, Param } from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { Types } from 'mongoose';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';

@Controller('module-progress')
export class ModuleProgressController {
  constructor(private readonly moduleProgressService: ModuleProgressService) {}

  @Post(':moduleId')
  async updateProgress(
    @Param('moduleId') moduleId: string,
    @Body() body: CreateModuleProgressDto,
  ) {
    return this.moduleProgressService.updateOrCreate(
      new Types.ObjectId(body.apprenantId),
      new Types.ObjectId(moduleId),
      new Types.ObjectId(body.enrollmentId),
      body.progressPercentage,
      body.status,
      body.isLocked,
    );
  }
}
