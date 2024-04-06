import { PartialType } from '@nestjs/mapped-types';
import { CreateChannellistDto } from './create-channellist.dto';

export class UpdateChannellistDto extends PartialType(CreateChannellistDto) {}
