import { Module } from '@nestjs/common';
import { SignController } from './interfaces/controller/sign.controller';
import { SignService } from './application/service/sign.service';
import { PasswordBcrypter } from './domain/PasswordBcrypter';
import { MemberModule } from '../member/member.module';
import { JwtTokenService } from './application/service/jwt-token.service';
import { getJwtConfig } from '../global/config/jwt.config';
import { AuthController } from './interfaces/controller/auth.controller';
import { AuthService } from './application/service/auth.service';

@Module({
  imports: [MemberModule, getJwtConfig()],
  controllers: [SignController, AuthController],
  providers: [
    SignService,
    AuthService,
    PasswordBcrypter,
    JwtTokenService,
    {
      provide: 'PasswordEncrypter',
      useClass: PasswordBcrypter,
    },
  ],
})
export class AuthModule {}
