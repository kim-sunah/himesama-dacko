import { Injectable } from '@nestjs/common';
import * as natural from 'natural';
import * as stopword from 'stopword';
import axios from 'axios';

@Injectable()
export class NlpService {
  private tokenizer: natural.WordTokenizer;
  private tfidf: natural.TfIdf;
  private koreanStopwords: string[];

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.koreanStopwords = [
      '이', '그', '저', '것', '수', '등', '들', '및', '에', '에서', "을", "이", '의', '가', '은', '는', '을', '를',
      '으로', '로', '에게', '뿐', '다', '와', '과', '도', '에도', '만', '까지', '마저', '조차', '보다',
      '한', '두', '세', '네', '어떤', '또', '또는', '혹은', '그리고', '하지만', '그러나', '그래서', '따라서'
    ];
  }

  processText(text: string): string[] {
    const tokens = text.split(/\s+/);
    const filteredTokens = tokens.filter(token => !this.koreanStopwords.includes(token));
    return filteredTokens;
  }

  extractKeywords(text: string , numKeywords: number = 6): string[] {
    
    const processedText = this.processText(text);
    if (processedText.length === 0) {
      return [];  
    }
    const frequencyMap = new Map<string, number>();
    processedText.forEach(word => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });
    return Array.from(frequencyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, numKeywords)
      .map(item => item[0]);
  }

  async searchVideos(query: string, maxResults: number = 10) {
    let video = []
    console.log(query)
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${query}&key=${process.env.Youtbe_Api_KEY}`)
    video = response.data.items;
    
    return video
 
  
  }
}