import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './global/config/type-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/.env.${process.env.NODE_ENV?.toLowerCase()}` }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfig,
    }),
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
