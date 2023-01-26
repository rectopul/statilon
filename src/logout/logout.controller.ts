import { Controller, Get, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service'
import { UserByToken } from 'src/session/auth';

@Controller('logout')
export class LogoutController {

    constructor(private auth: UserByToken, private prisma: PrismaService){}

    @Get()
    async view(@Req() req, @Res() res) {

        try {
            
            const token = req.cookies.token || ''

            if (!token) return res.redirect('/panel/login')

            const { id } = await this.auth.checkToken(token)

            await this.prisma.refreshToken.update({where: { id }, data: { revoked: true }})

            return res.redirect('/panel/login')
        } catch (error) {
            console.log(error)
            return res.redirect('/panel/login')
        }
    }
}
