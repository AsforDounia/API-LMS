import { Test, TestingModule } from '@nestjs/testing';
import { FormateurController } from './formateur.controller';
import { FormateurService } from './formateur.service';

describe('FormateurController', () => {
  let controller: FormateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormateurController],
      providers: [FormateurService],
    }).compile();

    controller = module.get<FormateurController>(FormateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
