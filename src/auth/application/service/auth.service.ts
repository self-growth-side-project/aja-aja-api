import { Inject, Injectable } from '@nestjs/common';
import { SendCodeResetPasswordServiceDto } from '../dto/send-code-reset-password.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { EmailService } from '../../../global/common/domain/infra/email.service';
import { AuthCodeCommandRepository } from '../../domain/repository/auth-code-command.repository';
import { AuthCode } from '../../domain/entity/AuthCode';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { VerifyCodeResetPasswordServiceDto } from '../dto/verify-code-reset-password.service.dto';
import { BadRequestException } from '../../../global/exception/bad-request.exception';
import { AuthCodeType } from '../../domain/enum/AuthCodeType';
import { TooManyRequestsException } from '../../../global/exception/too-many-requests.exception';
import { Member } from '../../../member/domain/entity/Member';

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
    const foundMember: Member | null = await this.memberCommandRepository.findByEmail(dto.email);

    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    const foundAuthCode = await this.authCodeCommandRepository.findAllByMemberIdAndTypeAndCreatedAtToday(
      foundMember.id,
      AuthCodeType.RESET_PASSWORD_EMAIL_AUTH_CODE,
    );

    if (foundAuthCode.length === 10) {
      throw new TooManyRequestsException(
        TooManyRequestsException.ErrorCodes.RESET_PASSWORD_EMAIL_REQUEST_LIMIT_EXCEEDED,
      );
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

    await this.authCodeCommandRepository.save(foundAuthCode);

    const token = AuthCode.createResetPasswordToken(foundAuthCode.member);

    return await this.authCodeCommandRepository.save(token);
  }
}
