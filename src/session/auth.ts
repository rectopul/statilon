import { PrismaService } from '../database/prisma.service'
import { GenerateTokenDTO } from 'src/modules/token.dto'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

type PasswordDTO = {
    password: string
    password_hash: string
}

@Injectable()
export class UserByToken {

    constructor(private prisma: PrismaService){}

    async generateToken(user: GenerateTokenDTO) {
        return jwt.sign({ id: user.user.id, user: user.user }, process.env.APP_SECRET)
    }

    async checkPassword(data: PasswordDTO) {
        try {
            return await bcrypt.compare(data.password, data.password_hash)
        } catch (error) {
            console.log(error)
        }
        
    }

    async checkToken(token: string): Promise<any> {
        try {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!token) return reject({error: `token not provided`})
        
                    const decoded = await jwt.verify(token, process.env.APP_SECRET)
        
                    const { jti } = decoded
                    
                    const Token = await this.prisma.refreshToken.findFirst({
                        where: {
                            id: jti,
                            revoked: false
                        }
                    })
        
                    if (!Token) return reject({ error: `token not exist or not valid`})
        
                    return resolve(Token)
                } catch (error) {
                    return reject({ error })
                }
                
            }) 
        } catch (error) {
            throw new Error(error?.message || error?.error)
        }
    }
} 