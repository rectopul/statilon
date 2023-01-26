import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { SessionService } from './session.service';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UsersService } from 'src/users/users.service';
import { UserByToken } from './auth';
const { v4: uuidv4 } = require('uuid');

@Controller('session')
export class SessionController {
    constructor(
        private service: SessionService,
        private token: JsonWebToken,
        private prisma: PrismaService,
        private auth: UserByToken
    ){}

    @Post()
    async view(@Req() req, @Res() res, @Body() body) {

        try {

            const expiration = process.env.EXPIRATION_TOKEN === 'testing' ? 60 : 1440
            
            const refreshToken = await this.service.login(body)
            

            res.cookie('token', refreshToken, {
                maxAge: expiration * 60000,
                expires: new Date(Date.now() + expiration * 60000),
                httpOnly: true,
                //secure: false, // set to true if your using https
            }) 


            return res.json({token: refreshToken})

            //return res.json({ user: theUser, token: newToken.hashedToken, msg: `Usuário logado com sucesso!` })
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
        }
    }
}
