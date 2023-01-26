import { Test, TestingModule } from '@nestjs/testing';
import { UserImageController } from './user_image.controller';
import { UserImageService } from './user_image.service';

describe('UserImageController', () => {
  let controller: UserImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserImageController],
      providers: [UserImageService],
    }).compile();

    controller = module.get<UserImageController>(UserImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
