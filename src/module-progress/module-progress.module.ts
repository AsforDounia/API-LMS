import { Module } from '@nestjs/common';
import { ModuleProgressService } from './module-progress.service';
import { ModuleProgressController } from './module-progress.controller';

@Module({
  controllers: [ModuleProgressController],
  providers: [ModuleProgressService],
})
export class ModuleProgressModule {}
