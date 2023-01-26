import { Injectable } from '@nestjs/common';
import { JsonWebToken } from '../modules/JsonWebToken';
import { UserByToken } from '../session/auth';
import { CreateUserImageDto } from './dto/create-user_image.dto';
import * as fs from 'fs'
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserImageService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JsonWebToken, 
    private auth: UserByToken
  ){}

  private async unlinkImage(file) {
    const exists = await fs.existsSync(`./uploads/${file.filename}`)

    if(exists) {
      await fs.unlink(`./uploads/${file.filename}`, (err: any) => {
        if (err) {
          console.error(`fs error: `, err);
          throw new Error(err)
          }
      })
    }
  }

  async create(file: any, token: string) {
    try {
      if(!token) throw new Error(`Token not provided`)

      const { id: jti } = await this.auth.checkToken(token)

      if(! await this.jwt.checkToken(jti)) throw new Error(`Token not valid`)

      const refreshToken = await this.prisma.refreshToken.findFirst({
        where: { id: jti },
        include: { User: true }
      })

      if(!refreshToken) throw new Error(`Refresh token not valid`)

      const data: CreateUserImageDto = {
        name: file.filename,
        user_id: refreshToken.User.id
      }

      const exists = await this.prisma.userImage.findFirst({ where: { user_id: refreshToken.User.id }})

      if(exists) {
        await this.unlinkImage(file)
        throw new Error(`User already image`)
      }

      const image = await this.prisma.userImage.create({data})

      const user  = await this.prisma.user.findFirst({ where: { id: refreshToken.User.id }, include: { UserImage: true }})

      return user
    } catch (error) {
      await this.unlinkImage(file)
      throw new Error(error?.message || error?.error)
    }
  }

  findAll() {
    return `This action returns all userImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userImage`;
  }

  async update(file: any, token: string) {
    try {
      if(!token) throw new Error(`Token not provided`)

      const { id: jti } = await this.auth.checkToken(token)

      const refreshToken = await this.prisma.refreshToken.findFirst({
        where: { id: jti },
        include: { User: { include: { UserImage: true }} }
      })


      if(!refreshToken) throw new Error(`Refresh token not valid`)

      const olderImage = await this.prisma.userImage.findFirst({ where: { id: refreshToken.User.UserImage.id }})

      if(!olderImage) throw new Error(`User Image not exist`)

      const image = await this.prisma.userImage.update({ 
        where: { user_id: refreshToken.User.id }, 
        data: { name: file.filename }
      })

      const actualImage = await this.prisma.user.findFirst({ where: { id: refreshToken.User.id }, include: { UserImage: true }})

      delete actualImage.password_hash
      delete actualImage.created_at
      delete actualImage.updated_at
      delete actualImage.UserImage.created_at
      delete actualImage.UserImage.updated_at
      delete actualImage.UserImage.user_id

      if(image) {
        const exists = fs.existsSync(`./uploads/${olderImage.name}`)

        if(exists) {
          await fs.unlink(`./uploads/${olderImage.name}`, (err: any) => {
            if (err) {
              console.error(err);
              throw new Error(err)
             }
          })
        }
        
      }

      return actualImage;

    } catch (error) {
      this.unlinkImage(file)
      throw new Error(error?.message || error?.error)
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} userImage`;
  }
}
