import { Module } from '@nestjs/common';
import { SignController } from './interfaces/controller/sign.controller';
import { SignService } from './application/service/sign.service';
import { PasswordBcrypter } from './domain/PasswordBcrypter';
import { MockMemberCommandRepository } from '../member/infra/mock-member-command.repository';

@Module({
  imports: [],
  controllers: [SignController],
  providers: [
    SignService,
    PasswordBcrypter,
    {
      provide: 'MemberCommandRepository',
      useClass: MockMemberCommandRepository,
    },
  ],
})
export class AuthModule {}
