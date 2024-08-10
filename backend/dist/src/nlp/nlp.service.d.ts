export declare class NlpService {
    private tokenizer;
    private tfidf;
    private koreanStopwords;
    constructor();
    processText(text: string): string[];
    extractKeywords(text: string, numKeywords?: number): string[];
    searchVideos(query: string, maxResults: number): Promise<any[]>;
}
