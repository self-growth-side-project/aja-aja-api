import { Global, Module } from '@nestjs/common';
import { TypeOrmTransactionModule } from './type-orm-transaction.module';
import { ShutDownManager } from '../shutdown.manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../type-orm.config';

const modules = [
  TypeOrmTransactionModule,
  TypeOrmModule.forRootAsync({
    useFactory: TypeOrmConfig,
  }),
];

@Global()
@Module({
  imports: [...modules],
  providers: [ShutDownManager],
  exports: [...modules],
})
export class GlobalModule {}
