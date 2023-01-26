import { PartialType } from '@nestjs/mapped-types';
import { CreateEletronicDto } from './create-eletronic.dto';

export class UpdateEletronicDto extends PartialType(CreateEletronicDto) {}
