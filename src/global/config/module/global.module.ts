import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShutDownManager } from '../shutdown.manager';
import { PasswordEncrypter } from '../../../auth/domain/PasswordEncrypter';
import { PasswordBcrypter } from '../../../auth/domain/PasswordBcrypter';
import { RefreshTokenEncrypter } from '../../../auth/domain/RefreshTokenEncrypter';
import { RefreshTokenBcrypter } from '../../../auth/domain/RefreshTokenBcrypter';
import { TransactionMiddleware } from '../../common/middleware/transaction.middleware';
import { NamespaceMiddleware } from '../../common/middleware/namespace.middleware';
import { MemberMiddleware } from '../../common/middleware/member.middleware';
import { MemberModule } from '../../../member/member.module';
import { EventListenerModule } from './event-listener.module';
import { TypeormConfigModule } from './typeorm-config.module';

const modules = [TypeormConfigModule, EventListenerModule, MemberModule];

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
export class GlobalModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(NamespaceMiddleware, TransactionMiddleware, MemberMiddleware).forRoutes('*');
  }
}
