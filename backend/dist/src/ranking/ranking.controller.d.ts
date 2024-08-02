import { RankingService } from './ranking.service';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    DBSubscriberChannels(DbOrder: InfluencerOrder, pagenumber: string, select: string): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    DBviewChannels(DbOrder: InfluencerOrder, pagenumber: string, select: string): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    DBVideoChannels(DbOrder: InfluencerOrder, pagenumber: string, select: string): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    SubscriberTop(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    ViewTop(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    SubscriberTopIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    SubscriberLowIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    ViewTopIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    ViewLowIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    WeekSubscriberTopIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    WeekSubscriberLowIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    WeekViewTopIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    WeekViewLowIncrease(): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    SortSubscriber(body: {
        sort: string;
        filter: string;
        page?: number;
    }): Promise<import("../channellist/entities/channellist.entity").Channellist[]>;
    Totalsubcriberincrease(channelId: string): Promise<{
        subscribers: import("../channellist/entities/subscriber.entity").SubscriberCount;
    }>;
    Totalviewincrease(channelId: string): Promise<{
        views: import("../channellist/entities/view.entity").ViewCount;
    }>;
    increaseview(): Promise<unknown>;
    increaseSubscriber(): Promise<unknown>;
}
