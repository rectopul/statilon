import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { UserByToken } from 'src/session/auth';
import { LogoutController } from './logout.controller';

@Module({
  controllers: [LogoutController],
  providers: [PrismaService, JsonWebToken, UserByToken]
})
export class LogoutModule {}