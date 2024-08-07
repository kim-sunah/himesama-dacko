import { ChannellistService } from './channellist.service';
import { CreateChannellistDto } from './dto/create-channellist.dto';
import { YoutubePageToken } from './dto/Yotube_PageToken.dto';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';
import { Request } from 'express';
export declare class ChannellistController {
    private readonly channellistService;
    constructor(channellistService: ChannellistService);
    channelInfo(channelId: string): Promise<import("./entities/channellist.entity").Channellist>;
    Getvideosearch(search: string, req: Request): Promise<{
        Channel_Url_Id: any;
        channel_img: any;
        videotitle: any;
        Channel_Id: any;
        nextPageToken: any;
        videoId: any;
        publishedAt: any;
        channelTitle: any;
        thumbnails: any;
        viewCount: number;
        subscriberCount: number;
        videoCount: number;
        videoviewcount: number;
        videolikecount: number;
        videocommentcount: number;
        viewdata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
        commentdata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
        likedata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
    }[]>;
    searchchannel(createChannellistDto: CreateChannellistDto): Promise<import("./entities/channellist.entity").Channellist>;
    Channel_VideoCount(): Promise<{
        lastChannel: number;
        lastVideo: number;
    }>;
    YoutubeApiGetChannel(YoutubeChannelApi: InfluencerOrder, search: string): Promise<any[]>;
    YoutubeApiGetVideo(YoutubeInfluencer: YoutubePageToken, search: string): Promise<{
        Channel_Url_Id: any;
        channel_img: any;
        videotitle: any;
        Channel_Id: any;
        nextPageToken: any;
        videoId: any;
        publishedAt: any;
        channelTitle: any;
        thumbnails: any;
        viewCount: number;
        subscriberCount: number;
        videoCount: number;
        videoviewcount: number;
        videolikecount: number;
        videocommentcount: number;
        viewdata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
        commentdata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
        likedata: {
            id: string;
            color: any;
            data: {
                x: string;
                y: number;
            }[];
        }[];
    }[]>;
    Live_Popular_CreateApi(ChannelId: string, categoryid: string, videoid: string): Promise<import("./entities/channellist.entity").Channellist>;
    incrementChannelClicks(ChannelId: string): Promise<import("typeorm").UpdateResult>;
    GetTopClickedChannel(): Promise<import("./entities/channellist.entity").Channellist[]>;
}
