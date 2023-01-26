import * as jwt from 'jsonwebtoken'
import * as crypto from  'crypto'
import { PrismaService } from '../database/prisma.service';
import { GenerateTokenDTO } from './token.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonWebToken {
    
    private prismaClient = new PrismaService()

    private generateAccessToken(data: GenerateTokenDTO) {
        return jwt.sign({ userId: data.user.id }, process.env.APP_SECRET, {
            expiresIn: '5m',
        });
    }

    private generateRefreshToken(data: GenerateTokenDTO) {
        return jwt.sign({
          userId: data.user.id,
          jti: data.jti
        }, process.env.JWT_REFRESH_SECRET, {
          expiresIn: '8h',
        });
    }

    generateTokens(data: GenerateTokenDTO): any {
        const accessToken = this.generateAccessToken(data);
        const refreshToken = this.generateRefreshToken(data);
      
        return {
          accessToken,
          refreshToken,
        };
    }

    hashToken(token: string) {
        return crypto.createHash('sha512').update(token).digest('hex');
    }

    async checkToken(token) {
        try {
            
            const checkToken = await this.prismaClient.refreshToken.findFirst({
                where: {
                    id: token,
                    revoked: false
                }
            })

            if(!checkToken) return false
            else return true
        } catch (error) {
            console.log(error)
        }
    }
}