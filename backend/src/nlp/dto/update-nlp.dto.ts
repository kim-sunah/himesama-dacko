import { PartialType } from '@nestjs/mapped-types';
import { CreateNlpDto } from './create-nlp.dto';

export class UpdateNlpDto extends PartialType(CreateNlpDto) {}
