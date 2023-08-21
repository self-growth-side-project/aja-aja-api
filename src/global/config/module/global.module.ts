import { Global, Module } from '@nestjs/common';
import { TypeOrmTransactionModule } from './type-orm-transaction.module';
import { ShutDownManager } from '../shutdown.manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../type-orm.config';
import { PasswordEncrypter } from '../../../auth/domain/PasswordEncrypter';
import { PasswordBcrypter } from '../../../auth/domain/PasswordBcrypter';
import { RefreshTokenEncrypter } from '../../../auth/domain/RefreshTokenEncrypter';
import { RefreshTokenBcrypter } from '../../../auth/domain/RefreshTokenBcrypter';
import { MemberService } from '../../../member/application/service/member.service';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { TypeormMemberCommandRepository } from '../../../member/infra/typeorm-member-command.repository';

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
    MemberService,
    {
      provide: MemberCommandRepository,
      useClass: TypeormMemberCommandRepository,
    },
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
    MemberService,
    {
      provide: PasswordEncrypter,
      useClass: PasswordBcrypter,
    },
    {
      provide: RefreshTokenEncrypter,
      useClass: RefreshTokenBcrypter,
    },
    {
      provide: MemberCommandRepository,
      useClass: TypeormMemberCommandRepository,
    },
  ],
})
export class GlobalModule {}
