import { Module } from '@nestjs/common';
import { TransactionManager } from '../../util/transaction-manager.util';

@Module({
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TypeOrmTransactionModule {}
