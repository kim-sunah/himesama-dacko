import { CreateFilterDto } from './dto/create-filter.dto';
import { Channellist } from 'src/channellist/entities/channellist.entity';
import { DataSource, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Video } from 'src/video/entities/video.entity';
import { videoview } from 'src/video/entities/videoview.entity';
import { videocomment } from 'src/video/entities/videocomment.entity';
import { videolike } from 'src/video/entities/videolike.entity';
import { InfluencerOrder } from './dto/DbOrder.dto';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';
interface Data {
    nextPageToken: any;
    prevPageToken: any;
    items: {
        id: any;
        snippet: any;
        prevPageToken: string;
    }[];
}
export declare class FilterService {
    private readonly channelList;
    private readonly videoRepository;
    private readonly cacheManager;
    private readonly videoviewRepository;
    private readonly videocommentRepository;
    private readonly videolikeRepository;
    private readonly SubscriberRepository;
    private readonly ViewRepository;
    private readonly VideoCountRepository;
    private dataSource;
    constructor(channelList: Repository<Channellist>, videoRepository: Repository<Video>, cacheManager: Cache, videoviewRepository: Repository<videoview>, videocommentRepository: Repository<videocomment>, videolikeRepository: Repository<videolike>, SubscriberRepository: Repository<SubscriberCount>, ViewRepository: Repository<ViewCount>, VideoCountRepository: Repository<VideoCount>, dataSource: DataSource);
    private getOneHourAgo;
    getChannelInfo(channelId: string): Promise<import("axios").AxiosResponse<any, any>>;
    getVideoInfo(videoId: string): Promise<import("axios").AxiosResponse<any, any>>;
    videoFilter(resData: Data): Promise<{
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
    private findOrCreateChannel;
    findOrCreateVideo(videoData: any, channelData: any): Promise<Video>;
    private createChannelDataObject;
    private createChartData;
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
    DBInfluencerOrder(dbOrder: InfluencerOrder, page: number): Promise<Channellist[]>;
    categoryFilter(categoryid: number): Promise<"Film & Animation" | "Autos & Vehicles" | "Music" | "Pets & Animals" | "Sports" | "Short Movies" | "Travel & Events" | "Gaming" | "Videoblogging" | "People & Blogs" | "Comedy" | "Entertainment" | "News & Politics">;
    YoutubeApiInfluencerOrder(YoutubeAPiOrder: InfluencerOrder, pagenumber: number): Promise<void>;
}
export {};
