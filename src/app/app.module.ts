import { Module } from '@nestjs/common';
import { AppController } from './interface/controller/app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
