
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars'
import { CustomHelper } from './helpers/hbs';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser())

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));


  app.engine('hbs', hbs({
    defaultLayout: `main`,
    extname: `hbs`, 
    helpers: CustomHelper
  }))

  app.setViewEngine('hbs');

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
