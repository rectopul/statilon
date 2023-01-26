import { Controller, Render, Get, Req, Res } from '@nestjs/common';

@Controller('panel/login')
export class LoginController {
    @Get()
    async root(@Req() req, @Res() res) {

        return res.render('pages/login', {
            pageClasses: `bg-default g-sidenav-show g-sidenav-pinned`,
            title: `Login`,
        })

    }
}
