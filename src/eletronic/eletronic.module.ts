import { Module } from '@nestjs/common';
import { EletronicService } from './eletronic.service';
import { EletronicController } from './eletronic.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [EletronicController],
  providers: [EletronicService, PrismaService]
})
export class EletronicModule {}
