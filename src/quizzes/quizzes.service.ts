import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import type { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  create(createQuizDto: CreateQuizDto) {
    return 'This action adds a new quize';
  }

  findAll() {
    return `This action returns all quizzes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quize`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quize`;
  }

  remove(id: number) {
    return `This action removes a #${id} quize`;
  }
}
