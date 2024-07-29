export interface Youtube_Video{
    kind: string,
    etag: string,
    id: string,
    snippet: {
      publishedAt: string,
      channel_id: string,
      title: string,
      description: string,
      thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
      };
      channelTitle: string,
      tags: [string],
      category_id: string,
      live_broadcast_content: string,
      default_language: string,
      localized: {
        title: string,
        description: string
      },
      default_audio_language: string
    },
    statistics: {
        viewCount: string,
        likeCount: string,
        dislikeCount: string,
        favoriteCount: string,
        commentCount: string
      },
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}


