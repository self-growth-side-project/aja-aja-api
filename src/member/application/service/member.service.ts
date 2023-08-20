import { Inject, Injectable } from '@nestjs/common';
import { CheckEmailDuplicationServiceDto } from '../dto/check-email-duplication-service.dto';
import { MemberCommandRepository } from '../../domain/repository/member-command.repository';

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberCommandRepository)
    private readonly memberCommandRepository: MemberCommandRepository,
  ) {}

  async checkEmailDuplication(dto: CheckEmailDuplicationServiceDto): Promise<boolean> {
    return await this.memberCommandRepository.existByEmail(dto.email);
  }
}
