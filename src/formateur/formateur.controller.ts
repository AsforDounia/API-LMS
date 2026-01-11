// filepath: src/formateur/formateur.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { CreateFormateurDto } from './dto/create-formateur.dto';
import { UpdateFormateurDto } from './dto/update-formateur.dto';
import { JwtAuthGuard, Roles, RolesGuard, CurrentUser } from '@src/auth';
import { Role } from '@src/common/enums/role.enum';
import { User } from '@users/entities/user.entity';

@Controller('formateur')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
export class FormateurController {
  constructor(private readonly formateurService: FormateurService) {}

  // ...existing code...

  // New endpoint for US-7.1: List enrolled learners
  @Get('enrolled-learners')
  async getEnrolledLearners(@CurrentUser() user: User) {
    const learners = await this.formateurService.getEnrolledLearners(user._id.toString());
    return { message: 'Enrolled learners retrieved', data: learners };
  }

  // New endpoint for US-7.2: View learner progress
  @Get('learner-progress/:learnerId')
  async getLearnerProgress(@Param('learnerId') learnerId: string, @CurrentUser() user: User) {
    const progress = await this.formateurService.getLearnerProgress(user._id.toString(), learnerId);
    return { message: 'Learner progress retrieved', data: progress };
  }
}