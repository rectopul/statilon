import { Module } from '@nestjs/common';
import { AlphanumericService } from './alphanumeric.service';
import { AlphanumericController } from './alphanumeric.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AlphanumericController],
  providers: [AlphanumericService, PrismaService]
})
export class AlphanumericModule {}
