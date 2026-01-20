import { Test, TestingModule } from '@nestjs/testing';
import { ModuleProgressService } from './module-progress.service';

describe('ModuleProgressService', () => {
  let service: ModuleProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleProgressService],
    }).compile();

    service = module.get<ModuleProgressService>(ModuleProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
