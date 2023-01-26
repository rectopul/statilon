import { PrismaService } from '../database/prisma.service';
import { JsonWebToken } from '../modules/JsonWebToken'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserByToken } from './auth';
import { Injectable } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');

type TokenDTO = {
  jti: string
  refreshToken: string
  userId: number
}

@Injectable()
export class SessionService {
    constructor(private prisma: PrismaService, private jwt: JsonWebToken, private auth: UserByToken){}

    async login(data: CreateUserDto) {
      try {
            
        const { user: theUser, password } = data

        
        if(!password || !theUser) throw new Error(`Por favor informe o usuário e senha`)

        //super and administrator
        const findUser = await this.prisma.user.findFirst({ where: { user: theUser }, include: { RefreshToken: true } })


        if (!findUser) {
            throw new Error(`Usuário não existe`)
        }
        
        if(!findUser.password_hash) throw new Error(`Usuário Não possui senha`)

        if (!(await this.auth.checkPassword({password, password_hash: findUser.password_hash}))) {
            //return res.redirect('/login')
            throw new Error(`Usuário ou senha incorreta`)
        }

        delete findUser.password_hash
        delete findUser.created_at
        delete findUser.updated_at

        const token = await this.prisma.refreshToken.findFirst({
            where: {userId: findUser.id}
        })
        
        if(!token) throw new Error(`Não existe token para este usuário`)

        const jti = uuidv4()

        const { refreshToken } = this.jwt.generateTokens({user: findUser, jti})

        await this.prisma.refreshToken.updateMany({ 
            where: { userId: findUser.id },
            data: { revoked: true }
        })


        await this.addRefreshTokenToWhitelist({jti, refreshToken, userId: findUser.id})

        return refreshToken

        //return res.json({ user: theUser, token: newToken.hashedToken, msg: `Usuário logado com sucesso!` })
      } catch (error) {
        throw new Error(error?.message || error?.error)
      }
    }

    // used when we create a refresh token.
    async addRefreshTokenToWhitelist(data: TokenDTO) {
        try {
            
            
            return await this.prisma.refreshToken.create({data: {
              id: data.jti,
              hashedToken: this.jwt.hashToken(data.refreshToken),
              userId: data.userId
            }})
        } catch (error) {
            console.log(error)
        }
      
    }
    
    // used to check if the token sent by the client is in the database.
    async findRefreshTokenById(id) {
      return await this.prisma.refreshToken.findUnique({
        where: {
          id,
        },
      });
    }
    
    // soft delete tokens after usage.
    async deleteRefreshToken(id) {
      return await this.prisma.refreshToken.update({
        where: {
          id,
        },
        data: {
          revoked: true
        }
      });
    }
    
    async revokeTokens(userId) {
      return await this.prisma.refreshToken.updateMany({
        where: {
          userId
        },
        data: {
          revoked: true
        }
      });
    }
}

