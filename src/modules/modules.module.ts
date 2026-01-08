import { Module as NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Module, ModuleSchema } from './entities/module.entity';

@NestModule({
  imports: [MongooseModule.forFeature([{ name: Module.name, schema: ModuleSchema }])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule { }
