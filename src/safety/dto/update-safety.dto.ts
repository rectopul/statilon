import { PartialType } from '@nestjs/mapped-types';
import { CreateSafetyDto } from './create-safety.dto';

export class UpdateSafetyDto extends PartialType(CreateSafetyDto) {}
