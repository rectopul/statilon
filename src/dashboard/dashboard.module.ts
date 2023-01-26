import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AppGateway } from 'src/app/app.gateway';
import { DashboardController } from './dashboard.controller';
import { UserByToken } from 'src/session/auth';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, AppGateway, UserByToken, DashboardController]
})
export class DashboardModule {}
