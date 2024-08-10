import { NlpService } from './nlp.service';
export declare class NlpController {
    private readonly nlpService;
    constructor(nlpService: NlpService);
    tokenize(text: string, maxresult?: number): Promise<any[]>;
}
