import { IsString } from "class-validator";
export class CreateChannellistDto {
    @IsString()
    Channel_Url_Id : string;

}
