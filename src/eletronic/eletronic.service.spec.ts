import { Test, TestingModule } from '@nestjs/testing';
import { EletronicService } from './eletronic.service';

describe('EletronicService', () => {
  let service: EletronicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EletronicService],
    }).compile();

    service = module.get<EletronicService>(EletronicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
