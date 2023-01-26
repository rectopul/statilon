
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login/login.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { AccountController } from './account/account.controller';
import { AppGateway } from './app/app.gateway';
import { ClientsModule } from './clients/clients.module';
import { LogoutController } from './logout/logout.controller';
import { SessionModule } from './session/session.module';
import { PrismaService } from './database/prisma.service';
import { JsonWebToken } from './modules/JsonWebToken';
import { LogoutModule } from './logout/logout.module';
import { UserByToken } from './session/auth';
import { UsersModule } from './users/users.module';
import { SafetyModule } from './safety/safety.module';
import { DocumentsModule } from './documents/documents.module';
import { EletronicModule } from './eletronic/eletronic.module';
import { AlphanumericModule } from './alphanumeric/alphanumeric.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PopupController } from './popup/popup.controller';
import { MnemonicController } from './mnemonic/mnemonic.controller';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule, SessionModule, LogoutModule, UsersModule, SafetyModule, DocumentsModule, EletronicModule, AlphanumericModule, DashboardModule],
  controllers: [LoginController, AccountController, LogoutController, PopupController, MnemonicController],
  providers: [AppGateway, PrismaService, JsonWebToken, UserByToken],
})
export class AppModule {}
