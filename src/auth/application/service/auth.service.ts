import { Inject, Injectable } from '@nestjs/common';
import { MemberQueryRepository } from '../../../member/domain/repository/member-query.repository';
import { MemberCondition } from '../../../member/domain/repository/dto/member.condition';
import { SendCodeResetPasswordServiceDto } from '../dto/send-code-reset-password.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MemberQueryRepository')
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {}

  async sendCodeToResetPassword(dto: SendCodeResetPasswordServiceDto): Promise<void> {
    const foundMember = await this.memberQueryRepository.find(MemberCondition.of(dto.email));
    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    //await this.emailService.send('rlarjsgns1@gmail.com', 'hello', 'hello');
  }
}
