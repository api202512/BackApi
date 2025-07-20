import { Test, TestingModule } from '@nestjs/testing';
import { ApiUsoController } from './api-uso.controller';

describe('ApiUsoController', () => {
  let controller: ApiUsoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiUsoController],
    }).compile();

    controller = module.get<ApiUsoController>(ApiUsoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
