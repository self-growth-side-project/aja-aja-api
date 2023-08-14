import { Inject, Injectable } from '@nestjs/common';
import { SendCodeResetPasswordServiceDto } from '../dto/send-code-reset-password.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { EmailService } from '../../../global/common/domain/infra/email.service';
import { AuthCodeCommandRepository } from '../../domain/repository/auth-code-command.repository';
import { AuthCode } from '../../domain/entity/AuthCode';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { AuthCodeType } from '../../domain/enum/AuthCodeType';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MemberCommandRepository')
    private readonly memberCommandRepository: MemberCommandRepository,

    @Inject('AuthCodeCommandRepository')
    private readonly authCodeCommandRepository: AuthCodeCommandRepository,

    @Inject('EmailService')
    private readonly emailService: EmailService,
  ) {}

  async sendCodeToResetPassword(dto: SendCodeResetPasswordServiceDto): Promise<void> {
    const foundMember = await this.memberCommandRepository.findByEmail(dto.email);

    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    const foundAuthCode = await this.authCodeCommandRepository.findByMemberIdAndType(
      foundMember.id,
      AuthCodeType.RESET_PASSWORD_EMAIL_AUTH_CODE,
    );

    if (foundAuthCode) {
      await this.authCodeCommandRepository.remove(foundAuthCode);
    }

    const authCode = AuthCode.createResetPasswordEmailAuthCode(foundMember);

    await this.authCodeCommandRepository.save(authCode);

    this.emailService.send('developerkgh@gmail.com', '인증번호', authCode.code);
  }
}
