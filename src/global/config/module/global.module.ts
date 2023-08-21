import { Global, Module } from '@nestjs/common';
import { TypeOrmTransactionModule } from './type-orm-transaction.module';
import { ShutDownManager } from '../shutdown.manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../type-orm.config';
import { PasswordEncrypter } from '../../../auth/domain/PasswordEncrypter';
import { PasswordBcrypter } from '../../../auth/domain/PasswordBcrypter';
import { RefreshTokenEncrypter } from '../../../auth/domain/RefreshTokenEncrypter';
import { RefreshTokenBcrypter } from '../../../auth/domain/RefreshTokenBcrypter';

const modules = [
  TypeOrmTransactionModule,
  TypeOrmModule.forRootAsync({
    useFactory: TypeOrmConfig,
  }),
];

@Global()
@Module({
  imports: [...modules],
  providers: [
    ShutDownManager,
    {
      provide: PasswordEncrypter,
      useClass: PasswordBcrypter,
    },
    {
      provide: RefreshTokenEncrypter,
      useClass: RefreshTokenBcrypter,
    },
  ],
  exports: [
    ...modules,
    {
      provide: PasswordEncrypter,
      useClass: PasswordBcrypter,
    },
    {
      provide: RefreshTokenEncrypter,
      useClass: RefreshTokenBcrypter,
    },
  ],
})
export class GlobalModule {}
