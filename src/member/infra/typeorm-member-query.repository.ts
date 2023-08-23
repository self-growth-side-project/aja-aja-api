import { Injectable } from '@nestjs/common';
import { MemberQueryRepository } from '../domain/repository/member-query.repository';
import { MemberCondition } from '../domain/repository/dto/member.condition';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Member } from '../domain/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberResponse } from '../interfaces/dto/member.response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TypeormMemberQueryRepository implements MemberQueryRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async find(condition: MemberCondition): Promise<MemberResponse | null> {
    const queryBuilder = this.memberRepository
      .createQueryBuilder('member')
      .select(['member.id as _id', 'member.email as _email', 'member.password as _password', 'member.role as _role']);

    this.eqId(queryBuilder, condition.id);
    this.eqEmail(queryBuilder, condition.email);

    const result = (await queryBuilder.getRawOne()) as unknown;

    return plainToInstance(MemberResponse, result);
  }

  private eqId(queryBuilder: SelectQueryBuilder<Member>, id?: number | null): void {
    if (!id) {
      return;
    }

    queryBuilder.andWhere('member.id = :id', { id });
  }

  private eqEmail(queryBuilder: SelectQueryBuilder<Member>, email?: string | null): void {
    if (!email) {
      return;
    }

    queryBuilder.andWhere('member.email = :email', { email });
  }
}
