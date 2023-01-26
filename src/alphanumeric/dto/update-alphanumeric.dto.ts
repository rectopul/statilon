import { PartialType } from '@nestjs/mapped-types';
import { CreateAlphanumericDto } from './create-alphanumeric.dto';

export class UpdateAlphanumericDto extends PartialType(CreateAlphanumericDto) {}
