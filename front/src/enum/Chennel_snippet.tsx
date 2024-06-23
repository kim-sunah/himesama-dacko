interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
}
interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    customUrl : string
}
export interface ChannelSnippet {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}
