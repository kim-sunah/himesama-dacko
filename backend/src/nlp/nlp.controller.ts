import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { CreateNlpDto } from './dto/create-nlp.dto';
import { UpdateNlpDto } from './dto/update-nlp.dto';

@Controller('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) {}

  @Post('tokenize')
  async tokenize(@Body('text') text: string) {
  
    const keywords = this.nlpService.extractKeywords(text,6);
    const searchQuery = keywords.join(' ');
    return await this.nlpService.searchVideos(searchQuery, 5);
  }

 
}
