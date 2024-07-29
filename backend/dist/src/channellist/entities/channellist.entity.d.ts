import { Video } from "src/video/entities/video.entity";
export declare class Channellist {
    id: number;
    Channel_nickname: string;
    Channel_Url_Id: string;
    Channel_Id: string;
    subscriberCount: number;
    categoryid: number;
    subscriberCount_percentageincrease: number | null;
    week_subscriberCount_percentageincrease: number | null;
    month_subscriberCount_percentageincrease: number | null;
    videoCount: number;
    viewCount: number;
    viewCount_percentageincrease: number | null;
    week_viewCount_percentageincrease: number | null;
    month_viewCount_percentageincrease: number | null;
    channel_img: string;
    video: Video[];
}
