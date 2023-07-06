import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from './global/config/nest-app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  await app.listen(8602);
}

bootstrap();
