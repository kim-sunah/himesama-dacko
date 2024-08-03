import { Channellist } from 'src/channellist/entities/channellist.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { InfluencerOrder } from 'src/filter/dto/DbOrder.dto';
import { SubscriberCount } from 'src/channellist/entities/subscriber.entity';
import { ViewCount } from 'src/channellist/entities/view.entity';
import { VideoCount } from 'src/channellist/entities/video.entity';
export declare class RankingService {
    private readonly channelRepository;
    private readonly subcriberRepositry;
    private readonly viewRepositry;
    private readonly videoRepositry;
    private readonly cacheManager;
    constructor(channelRepository: Repository<Channellist>, subcriberRepositry: Repository<SubscriberCount>, viewRepositry: Repository<ViewCount>, videoRepositry: Repository<VideoCount>, cacheManager: Cache);
    DBSubscriberChannels(dbOrder: InfluencerOrder, page: number, select: string): Promise<Channellist[]>;
    DBviewChannels(dbOrder: InfluencerOrder, page: number, select: string): Promise<Channellist[]>;
    DBVideoChannels(dbOrder: InfluencerOrder, page: number, select: string): Promise<Channellist[]>;
    SubscriberTop(): Promise<Channellist[]>;
    ViewTop(): Promise<Channellist[]>;
    SubscriberTopIncrease(): Promise<Channellist[]>;
    SubscriberlowIncrease(): Promise<Channellist[]>;
    ViewTopIncrease(): Promise<Channellist[]>;
    ViewlowIncrease(): Promise<Channellist[]>;
    WeekSubscriberTopIncrease(): Promise<Channellist[]>;
    WeekSubscriberlowIncrease(): Promise<Channellist[]>;
    WeekViewTopIncrease(): Promise<Channellist[]>;
    WeekViewlowIncrease(): Promise<Channellist[]>;
    SortSubscriber(sort: string, filter: number, page?: number): Promise<Channellist[]>;
    Totalsubcriberincrease(channelId: string): Promise<{
        subscribers: SubscriberCount;
    }>;
    Totalviewincrease(channelId: string): Promise<{
        views: ViewCount;
    }>;
    increaseview(): Promise<unknown>;
    increaseSubscriber(): Promise<unknown>;
}
