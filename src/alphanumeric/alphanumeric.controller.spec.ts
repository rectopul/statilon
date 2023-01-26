import { Test, TestingModule } from '@nestjs/testing';
import { AlphanumericController } from './alphanumeric.controller';
import { AlphanumericService } from './alphanumeric.service';

describe('AlphanumericController', () => {
  let controller: AlphanumericController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlphanumericController],
      providers: [AlphanumericService],
    }).compile();

    controller = module.get<AlphanumericController>(AlphanumericController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
