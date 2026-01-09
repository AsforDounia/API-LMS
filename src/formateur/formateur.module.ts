import { Module } from '@nestjs/common';
import { FormateurService } from './formateur.service';
import { FormateurController } from './formateur.controller';

@Module({
  controllers: [FormateurController],
  providers: [FormateurService],
})
export class FormateurModule {}
