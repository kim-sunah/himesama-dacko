export interface Comment {
    kind: "youtube#commentThread";
    etag: string;
    id: string;
    snippet: {
        channelId: string;
        videoId: string;
        topLevelComment: CommentDetail;
        canReply: boolean;
        totalReplyCount: number;
        isPublic: boolean;
    };
}

interface CommentDetail {
    kind: "youtube#comment";
    etag: string;
    id: string;
    snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        authorChannelUrl: string;
        authorChannelId: {
            value: string;
        };
        channelId: string;
        videoId: string;
        textDisplay: string;
        textOriginal: string;
        parentId?: string;
        canRate: boolean;
        viewerRating: string;
        likeCount: number;
        moderationStatus?: string;
        publishedAt: string;
        updatedAt: string;
    };
}