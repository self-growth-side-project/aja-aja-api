import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global/config/module/global.module';
import { AdminModule } from './admin/admin.module';
import { QuestionModule } from './question/question.module';
import { GrowthModule } from './growth/growth.module';

const applicationModules = [AdminModule, QuestionModule, GrowthModule];

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/.env.${process.env.NODE_ENV}` }),
    GlobalModule,
    ...applicationModules,
  ],
  controllers: [AppController],
})
export class AppModule {}
