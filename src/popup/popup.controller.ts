import { Controller, Get, Param, Render, Req, Res } from '@nestjs/common';

@Controller('module/popup')
export class PopupController {

    @Get(':wallet_type')
    @Render('pages/popup')
    async open(@Req() req, @Res() res, @Param('wallet_type') wallet): Promise<object>{
        try {

            return {
                pageClasses: `bg-light g-sidenav-show g-sidenav-pinned`,
                title: `Terra Station`,
                wallet
            }
        } catch (error) {
            console.log(error)
        }
    }
}
