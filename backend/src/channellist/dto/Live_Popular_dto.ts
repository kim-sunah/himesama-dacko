import { IsString, IsBoolean, IsNumber, IsObject, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class Thumbnail {
    @IsString()
    url: string;

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;
}

class Thumbnails {
    @ValidateNested()
    @Type(() => Thumbnail)
    default: Thumbnail;

    @ValidateNested()
    @Type(() => Thumbnail)
    medium: Thumbnail;

    @ValidateNested()
    @Type(() => Thumbnail)
    high: Thumbnail;

    @ValidateNested()
    @Type(() => Thumbnail)
    standard?: Thumbnail;

    @ValidateNested()
    @Type(() => Thumbnail)
    maxres?: Thumbnail;
}

class Snippet {
    @IsString()
    publishedAt: string;

    @IsString()
    channelId: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @ValidateNested()
    @Type(() => Thumbnails)
    thumbnails: Thumbnails;
}

class ContentDetails {
    @IsString()
    duration: string;

    @IsString()
    dimension: string;

    @IsString()
    definition: string;

    @IsString()
    caption: string;

    @IsBoolean()
    licensedContent: boolean;

    @IsObject()
    contentRating: Record<string, unknown>;

    @IsString()
    projection: string;
}

export class PopularVideo {
    @IsString()
    kind: string;

    @IsString()
    etag: string;

    @IsString()
    id: string;

    @ValidateNested()
    @Type(() => Snippet)
    snippet: Snippet;

    @ValidateNested()
    @Type(() => ContentDetails)
    contentDetails: ContentDetails;
}

export class PopularVideoArrayDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PopularVideo)
    videos: PopularVideo[];
}