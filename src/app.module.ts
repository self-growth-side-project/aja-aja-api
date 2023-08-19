import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './global/config/type-orm.config';
import { TransactionMiddleware } from './global/common/middleware/transaction.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfig,
    }),
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
