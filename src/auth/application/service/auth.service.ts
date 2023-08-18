import { Inject, Injectable } from '@nestjs/common';
import { SendCodeResetPasswordServiceDto } from '../dto/send-code-reset-password.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { EmailService } from '../../../global/common/domain/infra/email.service';
import { AuthCodeCommandRepository } from '../../domain/repository/auth-code-command.repository';
import { AuthCode } from '../../domain/entity/AuthCode';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { VerifyCodeResetPasswordServiceDto } from '../dto/verify-code-reset-password.service.dto';
import { BadRequestException } from '../../../global/exception/bad-request.exception';
import { TimeUtil } from '../../../global/util/time.util';

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

    console.log(TimeUtil.getStartOfTodayInKSTAsUTC());
    console.log(TimeUtil.getEndOfTodayInKSTAsUTC());

    const foundAuthCode = null;

    if (foundAuthCode) {
      await this.authCodeCommandRepository.remove(foundAuthCode);
    }

    const authCode = AuthCode.createResetPasswordEmailAuthCode(foundMember);

    await this.authCodeCommandRepository.save(authCode);

    this.emailService.send('developerkgh@gmail.com', '인증번호', authCode.code);
  }

  async verifyAuthCodeByResetPassword(dto: VerifyCodeResetPasswordServiceDto): Promise<AuthCode> {
    const foundAuthCode: AuthCode | null = await this.authCodeCommandRepository.findByCode(dto.code);

    if (!foundAuthCode) {
      throw new BadRequestException(BadRequestException.ErrorCodes.FAILED_TO_VERIFY_AUTH_CODE);
    }

    foundAuthCode.verify(dto.email);

    await this.authCodeCommandRepository.remove(foundAuthCode);

    /*    const foundToken = await this.authCodeCommandRepository.findByMemberIdAndType(
      foundAuthCode.member.id,
      AuthCodeType.RESET_PASSWORD_TOKEN,
    );*/

    const foundToken = null;

    if (foundToken) {
      await this.authCodeCommandRepository.remove(foundToken);
    }

    const token = AuthCode.createResetPasswordToken(foundAuthCode.member);

    return await this.authCodeCommandRepository.save(token);
  }
}
