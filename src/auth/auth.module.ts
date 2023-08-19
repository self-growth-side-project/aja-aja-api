import { Module } from '@nestjs/common';
import { SignController } from './interfaces/controller/sign.controller';
import { SignService } from './application/service/sign.service';
import { PasswordBcrypter } from './domain/PasswordBcrypter';
import { MemberModule } from '../member/member.module';
import { JwtTokenService } from './application/service/jwt-token.service';
import { getJwtConfig } from '../global/config/jwt.config';
import { AuthController } from './interfaces/controller/auth.controller';
import { AuthService } from './application/service/auth.service';
import { EmailModule } from '../global/infra/email/email.module';
import { TypeormAuthCodeCommandRepository } from './infra/typeorm-auth-code-command.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCode } from './domain/entity/auth-code.entity';
import { AuthCodeCommandRepository } from './domain/repository/auth-code-command.repository';
import { TransactionManager } from '../global/util/transaction-manager.util';

@Module({
  imports: [TypeOrmModule.forFeature([AuthCode]), MemberModule, EmailModule, getJwtConfig()],
  controllers: [SignController, AuthController],
  providers: [
    SignService,
    AuthService,
    PasswordBcrypter,
    JwtTokenService,
    TransactionManager,
    {
      provide: 'PasswordEncrypter',
      useClass: PasswordBcrypter,
    },
    {
      provide: AuthCodeCommandRepository,
      useClass: TypeormAuthCodeCommandRepository,
    },
  ],
})
export class AuthModule {}
