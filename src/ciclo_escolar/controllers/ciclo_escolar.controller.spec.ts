import { Test, TestingModule } from '@nestjs/testing';
import { CicloEscolarController } from './ciclo_escolar.controller';

describe('CicloEscolarController', () => {
  let controller: CicloEscolarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CicloEscolarController],
    }).compile();

    controller = module.get<CicloEscolarController>(CicloEscolarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
