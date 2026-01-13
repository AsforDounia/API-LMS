// import 'dotenv/config';
// import { NestFactory } from '@nestjs/core';
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Module as ModuleEntity, ModuleSchema, ModuleType } from './src/modul/schema/module.schema';
// import { Model, Document } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';

// const MONGO_URI = process.env.MONGO_URI|| 'mongodb://localhost:27017/test'; 
// @Module({
//   imports: [
//     MongooseModule.forRoot(MONGO_URI),
//     MongooseModule.forFeature([
//       { name: ModuleEntity.name, schema: ModuleSchema },
//     ]),
//   ],
// })
// class SeederModule {
//   constructor(
//     @InjectModel(ModuleEntity.name)
//     private readonly moduleModel: Model<ModuleEntity & Document>,
//   ) {}

//   async seed() {
//     await this.moduleModel.create({
//       title: 'Introduction à NestJS',
//       description: 'Découvrir les bases du framework NestJS',
//       order: 1,
//       type: ModuleType.VIDEO,
//       isPublished: true,
//     });
//     console.log('Module seedé !');
//   }
// }

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(SeederModule);
//   const seeder = app.get(SeederModule);
//   await seeder.seed();
//   await app.close();
// }

// bootstrap();
