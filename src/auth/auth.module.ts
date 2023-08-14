import { Module } from '@nestjs/common';
import { SignController } from './interfaces/controller/sign.controller';
import { SignService } from './application/service/sign.service';
import { PasswordBcrypter } from './domain/PasswordBcrypter';
import { MemberModule } from '../member/member.module';
import { JwtTokenService } from './application/service/jwt-token.service';
import { getJwtConfig } from '../global/config/jwt.config';

@Module({
  imports: [MemberModule, getJwtConfig()],
  controllers: [SignController],
  providers: [
    SignService,
    PasswordBcrypter,
    JwtTokenService,
    {
      provide: 'PasswordEncrypter',
      useClass: PasswordBcrypter,
    },
  ],
})
export class AuthModule {}
