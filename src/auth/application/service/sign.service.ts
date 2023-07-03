import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignUpServiceDto } from '../dto/sign-up.service.dto';
import { Member } from '../../../member/domain/Member';
import { PasswordBcrypter } from '../../domain/PasswordBcrypter';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';

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
      throw new HttpException('중복일 수 없습니다.', 400);
    }

    return await this.memberCommandRepository.save(member);
  }
}
