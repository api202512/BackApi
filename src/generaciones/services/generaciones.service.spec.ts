import { Test, TestingModule } from '@nestjs/testing';
import { GeneracionesService } from './generaciones.service';

describe('GeneracionesService', () => {
  let service: GeneracionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneracionesService],
    }).compile();

    service = module.get<GeneracionesService>(GeneracionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
