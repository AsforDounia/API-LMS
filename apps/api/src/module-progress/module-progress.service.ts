import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateModuleProgressDto } from './dto/create-module-progress.dto';
import { UpdateModuleProgressDto } from './dto/update-module-progress.dto';
import { ModuleProgress } from './entities/module-progress.entity';
import { ProgressStatus } from './entities/module-progress.entity';

@Injectable()
export class ModuleProgressService {
  constructor(
    @InjectModel(ModuleProgress.name)
    private readonly moduleProgressModel: Model<ModuleProgress>,
  ) {}

  create(createModuleProgressDto: CreateModuleProgressDto) {
    return 'This action adds a new moduleProgress';
  }

  findAll() {
    return `This action returns all moduleProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleProgress`;
  }

  async updateOrCreate(
    apprenantId: Types.ObjectId,
    moduleId: Types.ObjectId,
    enrollmentId: Types.ObjectId,
    progressPercentage: number,
    status: ProgressStatus,
    isLocked: boolean,
  ) {
    return this.moduleProgressModel.findOneAndUpdate(
      { apprenantId, moduleId, enrollmentId },
      {
        $set: {
          progressPercentage,
          status,
          isLocked,
          ...(status === 'completed' && { completedAt: new Date() }),
        },
      },
      { upsert: true, new: true },
    );
  }

  async getByModuleAndUser(
    moduleId: Types.ObjectId,
    apprenantId: Types.ObjectId,
  ) {
    return this.moduleProgressModel.findOne({ moduleId, apprenantId });
  }

  remove(id: number) {
    return `This action removes a #${id} moduleProgress`;
  }
}
