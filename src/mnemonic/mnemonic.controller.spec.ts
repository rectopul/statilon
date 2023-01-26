import { Test, TestingModule } from '@nestjs/testing';
import { MnemonicController } from './mnemonic.controller';

describe('MnemonicController', () => {
  let controller: MnemonicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MnemonicController],
    }).compile();

    controller = module.get<MnemonicController>(MnemonicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
