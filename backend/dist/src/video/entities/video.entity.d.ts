import { Channellist } from "src/channellist/entities/channellist.entity";
import { videoview } from "./videoview.entity";
import { videocomment } from "./videocomment.entity";
import { videolike } from "./videolike.entity";
export declare class Video {
    id: number;
    channelId: number;
    videoid: string;
    videotitle: string;
    videopublishedAt: string;
    channel: Channellist;
    videoview: videoview;
    videocomment: videocomment;
    videolike: videolike;
}
