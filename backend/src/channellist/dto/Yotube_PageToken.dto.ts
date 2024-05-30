import { IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";
export class YoutubePageToken {
    @IsString()
    @IsOptional()
    PageToken? :  string | null;




}
