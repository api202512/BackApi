import { Test, TestingModule } from '@nestjs/testing';
import { GeneracionesController } from './generaciones.controller';

describe('GeneracionesController', () => {
  let controller: GeneracionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneracionesController],
    }).compile();

    controller = module.get<GeneracionesController>(GeneracionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
