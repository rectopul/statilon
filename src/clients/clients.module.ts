import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AppGateway } from 'src/app/app.gateway';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, AppGateway]
})
export class ClientsModule {}
