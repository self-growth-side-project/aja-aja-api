import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global/config/module/global.module';

const applicationModules = [AuthModule, MemberModule];

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/.env.${process.env.NODE_ENV}` }),
    GlobalModule,
    ...applicationModules,
  ],
  controllers: [AppController],
})
export class AppModule {}
