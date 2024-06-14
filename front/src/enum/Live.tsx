enum VideoKind {
    Video = "youtube#video",
    SearchResult = "youtube#searchResult"
  }
  
  interface VideoId {
    kind: VideoKind.Video;
    videoId: string;
  }
  
  interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    liveBroadcastContent: string
    publishTime: string
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
  }
  
  export interface LiveVideo {
    kind: VideoKind.SearchResult; // Specify the kind as VideoKind.Video
    etag: string;
    id: VideoId; // Use the VideoId interface for id
    snippet: Snippet;
  }