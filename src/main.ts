import { NestFactory } from '@nestjs/core';
import { AjaAjaModule } from './aja-aja.module';
import { setNestApp } from './global/config/nest-app.config';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AjaAjaModule);
  console.log('111');
  setNestApp(app);
  await app.listen(Number(process.env.SERVER_PORT));
}

bootstrap();
