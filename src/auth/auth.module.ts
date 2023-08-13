import { Module } from '@nestjs/common';
import { SignController } from './interfaces/controller/sign.controller';
import { SignService } from './application/service/sign.service';
import { PasswordBcrypter } from './domain/PasswordBcrypter';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [SignController],
  providers: [SignService, PasswordBcrypter],
})
export class AuthModule {}
