import { MemberCommandRepository } from '../domain/repository/member-command.repository';
import { Member } from '../domain/entity/Member';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormMemberCommandRepository implements MemberCommandRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async count(): Promise<number> {
    return this.memberRepository.count();
  }

  async save(member: Member): Promise<Member> {
    return this.memberRepository.save(member);
  }

  async existByEmail(email: string): Promise<boolean> {
    return await this.memberRepository.exist({ where: { email: email } });
  }
}
