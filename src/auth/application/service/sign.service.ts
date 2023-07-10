import { Inject, Injectable } from '@nestjs/common';
import { SignUpServiceDto } from '../dto/sign-up.service.dto';
import { Member } from '../../../member/domain/entity/Member';
import { PasswordBcrypter } from '../../domain/PasswordBcrypter';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { ConflictException } from '../../../global/exception/conflict.exception';

@Injectable()
export class SignService {
  constructor(
    private readonly passwordBcrypter: PasswordBcrypter,

    @Inject('MemberCommandRepository')
    private readonly memberCommandRepository: MemberCommandRepository,
  ) {}

  async signUp(dto: SignUpServiceDto): Promise<Member> {
    const member = await Member.signUpMember(dto.email, dto.password, this.passwordBcrypter);

    const isExist = await this.memberCommandRepository.existByEmail(member.email);
    if (isExist) {
      throw new ConflictException(ConflictException.ErrorCodes.DUPLICATE_EMAIL);
    }

    return await this.memberCommandRepository.save(member);
  }
}
