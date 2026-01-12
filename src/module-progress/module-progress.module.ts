import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleProgress, ModuleProgressSchema } from './entities/module-progress.entity';
import { ModuleProgressService } from './module-progress.service';
import { ModuleProgressController } from './module-progress.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModuleProgress.name, schema: ModuleProgressSchema },
    ]),
  ],
  controllers: [ModuleProgressController],
  providers: [ModuleProgressService],
  exports: [ModuleProgressService],
})
export class ModuleProgressModule {}
