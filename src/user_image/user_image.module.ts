import { Module } from '@nestjs/common';
import { UserImageService } from './user_image.service';
import { UserImageController } from './user_image.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { UserByToken } from 'src/session/auth';

@Module({
  providers: [PrismaService, UserImageService, JsonWebToken, UserByToken]
})
export class UserImageModule {}
