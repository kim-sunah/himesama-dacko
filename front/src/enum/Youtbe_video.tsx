export interface Youtube_Video{
    kind: string,
    etag: string,
    id: string,
    snippet: {
      published_at: string,
      channel_id: string,
      title: string,
      description: string,
      thumbnails: {
        key: {
          url: string,
          width: number,
          height: number
        }
      },
      channel_title: string,
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


