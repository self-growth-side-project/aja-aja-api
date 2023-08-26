import { Inject, Injectable } from '@nestjs/common';
import { CheckEmailDuplicationServiceDto } from '../dto/check-email-duplication-service.dto';
import { MemberCommandRepository } from '../../domain/repository/member-command.repository';
import { ResetMyPasswordServiceDto } from '../dto/reset-my-password.service.dto';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { Member } from '../../domain/entity/member.entity';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { PasswordEncrypter } from '../../../auth/domain/PasswordEncrypter';
import { BadRequestException } from '../../../global/exception/bad-request.exception';

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberCommandRepository)
    private readonly memberCommandRepository: MemberCommandRepository,

    @Inject(PasswordEncrypter)
    private readonly passwordEncrypter: PasswordEncrypter,
  ) {}

  async checkEmailDuplication(dto: CheckEmailDuplicationServiceDto): Promise<boolean> {
    return await this.memberCommandRepository.existByEmail(dto.email);
  }

  async resetMyPassword(dto: ResetMyPasswordServiceDto): Promise<void> {
    const foundMember: Member | null = await this.memberCommandRepository.findById(GlobalContextUtil.getMember().id);

    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    const isMatch = await foundMember.isMatchPassword(dto.password, this.passwordEncrypter);

    if (!isMatch) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PASSWORD);
    }

    await foundMember.resetPassword(dto.newPassword, this.passwordEncrypter);

    await this.memberCommandRepository.save(foundMember);
  }
}
