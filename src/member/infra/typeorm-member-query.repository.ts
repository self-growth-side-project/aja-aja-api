import { Injectable } from '@nestjs/common';
import { MemberQueryRepository } from '../domain/repository/member-query.repository';
import { MemberCondition } from '../domain/repository/dto/member.condition';
import { MemberServiceDto } from '../application/dto/member.service.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Member } from '../domain/entity/Member';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeormMemberQueryRepository implements MemberQueryRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async find(condition: MemberCondition): Promise<MemberServiceDto | null> {
    const queryBuilder = this.memberRepository
      .createQueryBuilder('member')
      .select(['member.id as id', 'member.email as email', 'member.password as password', 'member.role as role']);

    this.eqId(queryBuilder, condition.email);

    const result = await queryBuilder.getRawOne();

    return plainToInstance(MemberServiceDto, result);
  }

  private eqId(queryBuilder: SelectQueryBuilder<Member>, email?: string): void {
    if (!email) {
      return;
    }

    queryBuilder.andWhere('member.email = :email', { email });
  }
}
