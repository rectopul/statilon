import { Test, TestingModule } from '@nestjs/testing';
import { AlphanumericService } from './alphanumeric.service';

describe('AlphanumericService', () => {
  let service: AlphanumericService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphanumericService],
    }).compile();

    service = module.get<AlphanumericService>(AlphanumericService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
