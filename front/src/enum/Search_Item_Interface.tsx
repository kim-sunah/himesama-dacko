interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  }
  
  interface VideoId {
    kind: string;
    videoId: string;
  }
  
  interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }
  
  export interface YouTubeSearchResult {
    kind: string;
    etag: string;
    id: VideoId;
    snippet: Snippet;
  }
  
