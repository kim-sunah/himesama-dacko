import { IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";
export class YoutubeInfluencerDto {
    @IsString()
    @IsOptional()
    PageToken? :  string | null;




}
