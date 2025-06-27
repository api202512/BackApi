import { Test, TestingModule } from '@nestjs/testing';
import { CicloEscolarService } from './ciclo_escolar.service';

describe('CicloEscolarService', () => {
  let service: CicloEscolarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CicloEscolarService],
    }).compile();

    service = module.get<CicloEscolarService>(CicloEscolarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
