import { UpdateService } from './update.service';
export declare class UpdateController {
    private readonly updateService;
    constructor(updateService: UpdateService);
    onModuleInit(): void;
    ChartDataUpdate(): Promise<void>;
    DailySubscriberChannelUpdate(): Promise<void>;
    DailyViewChannelUpdate(): Promise<void>;
    DailyVideoChannelUpdate(): Promise<void>;
    removeDuplicates(): Promise<void>;
    DayCountUpdate(): Promise<void>;
    WeekCountUpdate(): Promise<void>;
    MonthCountUpdate(): Promise<void>;
}
