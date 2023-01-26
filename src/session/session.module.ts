import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { UserByToken } from './auth';

@Module({
  controllers: [SessionController],
  providers: [PrismaService, SessionService, JsonWebToken, UserByToken]
})
export class SessionModule {}