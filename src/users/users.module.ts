import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserImageService } from 'src/user_image/user_image.service';
import { PrismaService } from '../database/prisma.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { SessionService } from 'src/session/session.service';
import { UserByToken } from 'src/session/auth';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JsonWebToken, SessionService, UserByToken, UserImageService]
})
export class UsersModule {}
