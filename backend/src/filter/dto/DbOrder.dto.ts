import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class InfluencerOrder {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    subscriberMin?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    subscriberMax?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    viewMin?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    viewMax?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    videoMin?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    videoMax?: number;


    @IsOptional()
    accurate_search? : boolean
}
