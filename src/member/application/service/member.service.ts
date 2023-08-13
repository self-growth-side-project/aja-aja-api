import { Inject, Injectable } from '@nestjs/common';
import { CheckLoginIdServiceDto } from '../dto/check-login-id.service.dto';
import { MemberCommandRepository } from '../../domain/repository/member-command.repository';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MemberCommandRepository')
    private readonly memberCommandRepository: MemberCommandRepository,
  ) {}

  async checkLoginIdDuplication(dto: CheckLoginIdServiceDto): Promise<boolean> {
    return await this.memberCommandRepository.existByEmail(dto.loginId);
  }
}
