declare class Thumbnail {
    url: string;
    width: number;
    height: number;
}
declare class Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
}
declare class Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
}
declare class ContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: Record<string, unknown>;
    projection: string;
}
export declare class PopularVideo {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetails;
}
export declare class PopularVideoArrayDto {
    videos: PopularVideo[];
}
export {};
