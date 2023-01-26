import { Controller, Get, Render } from '@nestjs/common';

@Controller('modules/account')
export class AccountController {
    @Get()
    @Render('pages/account')
    async account() {
        return {
            title: `Terra Station`,
            pageClasses: `statilon unicred`
        }
    }
}
