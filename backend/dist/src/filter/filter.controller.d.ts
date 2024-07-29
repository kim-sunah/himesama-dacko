import { FilterService } from './filter.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { InfluencerOrder } from './dto/DbOrder.dto';
export declare class FilterController {
    private readonly filterService;
    constructor(filterService: FilterService);
    Filterlength(createFilterDto: CreateFilterDto, search: string): Promise<{
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
    FilterDuration(videoDuration: string, search: string): Promise<{
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
    findOne(order: string, search: string): Promise<{
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
    DBInfluencerOrder(DbOrder: InfluencerOrder, pagenumber: string): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    YoutubeApiInfluencerOrder(YoutubeApiOrder: InfluencerOrder, pagenumber: string): Promise<void>;
}
