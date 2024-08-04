import { Repository } from "typeorm";
import { Channellist } from './entities/channellist.entity';
import { FilterService } from 'src/filter/filter.service';
import { Video } from 'src/video/entities/video.entity';
import { YoutubePageToken } from './dto/Yotube_PageToken.dto';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';
import { SubscriberCount } from './entities/subscriber.entity';
import { ViewCount } from './entities/view.entity';
import { VideoCount } from './entities/video.entity';
export declare class ChannellistService {
    private readonly channelList;
    private readonly FilterService;
    private readonly VideoRepository;
    private readonly SubscriberRepository;
    private readonly ViewRepository;
    private readonly VideoCountRepository;
    constructor(channelList: Repository<Channellist>, FilterService: FilterService, VideoRepository: Repository<Video>, SubscriberRepository: Repository<SubscriberCount>, ViewRepository: Repository<ViewCount>, VideoCountRepository: Repository<VideoCount>);
    Getvideosearch(search: string): Promise<{
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
    searchchannel(Channel_Url_Id: string): Promise<Channellist>;
    channelInfo(channelId: string): Promise<Channellist>;
    Channel_VideoCount(): Promise<{
        lastChannel: number;
        lastVideo: number;
    }>;
    YoutubeApiGetChannel(YoutubeChannelApi: InfluencerOrder, search: string): Promise<any[]>;
    meetsFilterCriteria(channel: any, filters: any): boolean;
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
    Live_Popular_CreateApi(ChannelId: string, categoryid: number, videoid: string): Promise<Channellist>;
    incrementChannelClicks(ChannelId: string): Promise<import("typeorm").UpdateResult>;
    GetTopClickedChannel(): Promise<Channellist>;
}
