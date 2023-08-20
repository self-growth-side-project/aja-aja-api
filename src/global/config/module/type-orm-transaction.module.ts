import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TransactionMiddleware } from '../../common/middleware/transaction.middleware';
import { TransactionManager } from '../../util/transaction-manager.util';

@Module({
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TypeOrmTransactionModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
