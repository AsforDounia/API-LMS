import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { describe, expect, beforeEach, it } from 'bun:test'

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
