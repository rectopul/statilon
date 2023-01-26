import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('module/mnemonic')
export class MnemonicController {
    @Get(':module')
    @Render('pages/mnemonic-form')
    async form(@Param('module') module): Promise<object>{
        try {
            return {
                module,
                pageClasses: `bg-light g-sidenav-show g-sidenav-pinned`,
                title: `Terra Station`
            }
        } catch (error) {
            console.log(error)
        }
    }
}
