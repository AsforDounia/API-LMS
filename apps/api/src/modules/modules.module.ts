import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './entities/module.entity';
import { CourseSchema } from '@src/courses/entities/course.entity';
import {
  ModuleProgress,
  ModuleProgressSchema,
} from '../module-progress/entities/module-progress.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Module.name, schema: ModuleSchema },
      { name: 'Course', schema: CourseSchema },
      { name: ModuleProgress.name, schema: ModuleProgressSchema },
    ]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
