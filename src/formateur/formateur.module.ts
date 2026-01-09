import { Module } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';
import { UsersModule } from '@src/users/users.module';
import {CourseModule } from 'src/'

@Module({
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}
