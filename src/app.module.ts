import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, MemberModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
