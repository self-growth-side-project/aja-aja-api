import { Module } from '@nestjs/common';
import { AjaAjaController } from './aja-aja.controller';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global/config/module/global.module';
import { AdminModule } from './admin/admin.module';
import { QuestionModule } from './question/question.module';
import { GrowthModule } from './growth/growth.module';
import { AppModule } from './app/app.module';

const applicationModules = [AdminModule, QuestionModule, GrowthModule, AppModule];

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/.env.${process.env.NODE_ENV}` }),
    GlobalModule,
    ...applicationModules,
  ],
  controllers: [AjaAjaController],
})
export class AjaAjaModule {}
