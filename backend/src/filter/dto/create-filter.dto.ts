import { IsString } from "class-validator";

export class CreateFilterDto {
    @IsString()
    upload : string
}
