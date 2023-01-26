import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { JsonWebToken } from '../modules/JsonWebToken';
import { SessionService } from '../session/session.service';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService, 
    private jsonWebToken: JsonWebToken, 
    private session: SessionService
  ){}


  async create(createUserDto: CreateUserDto): Promise<object> {
    try {

      createUserDto.password_hash = bcrypt.hashSync(createUserDto.password, 12)

      delete createUserDto.password

      const jti = uuidv4()

      const user = await this.prisma.user.create({data: createUserDto})

      const { accessToken, refreshToken } = this.jsonWebToken.generateTokens({user: user, jti})

      const tokenToWhitelist = await this.session.addRefreshTokenToWhitelist({jti, refreshToken, userId: user.id})

      return {
        user,
        accessToken,
        tokenToWhitelist
    }
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
    
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
