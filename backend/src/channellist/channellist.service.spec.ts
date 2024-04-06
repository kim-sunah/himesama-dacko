import { Test, TestingModule } from '@nestjs/testing';
import { ChannellistService } from './channellist.service';

describe('ChannellistService', () => {
  let service: ChannellistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannellistService],
    }).compile();

    service = module.get<ChannellistService>(ChannellistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
