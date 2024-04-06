import { Test, TestingModule } from '@nestjs/testing';
import { ChannellistController } from './channellist.controller';
import { ChannellistService } from './channellist.service';

describe('ChannellistController', () => {
  let controller: ChannellistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannellistController],
      providers: [ChannellistService],
    }).compile();

    controller = module.get<ChannellistController>(ChannellistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
