import { Test, TestingModule } from '@nestjs/testing';
import { UserImageService } from './user_image.service';

describe('UserImageService', () => {
  let service: UserImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserImageService],
    }).compile();

    service = module.get<UserImageService>(UserImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
