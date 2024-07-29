import { Module } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { NlpController } from './nlp.controller';

@Module({
  controllers: [NlpController],
  providers: [NlpService],
})
export class NlpModule {}
