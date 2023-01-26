import { Test, TestingModule } from '@nestjs/testing';
import { EletronicController } from './eletronic.controller';
import { EletronicService } from './eletronic.service';

describe('EletronicController', () => {
  let controller: EletronicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EletronicController],
      providers: [EletronicService],
    }).compile();

    controller = module.get<EletronicController>(EletronicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
