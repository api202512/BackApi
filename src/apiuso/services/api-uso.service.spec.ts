import { Test, TestingModule } from '@nestjs/testing';
import { ApiUsoService } from './api-uso.service';

describe('ApiUsoService', () => {
  let service: ApiUsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiUsoService],
    }).compile();

    service = module.get<ApiUsoService>(ApiUsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
