import { Test, TestingModule } from '@nestjs/testing';
import { SharedServiceController } from './shared-service.controller';

describe('SharedServiceController', () => {
  let controller: SharedServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedServiceController],
    }).compile();

    controller = module.get<SharedServiceController>(SharedServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
