import { Injectable } from '@nestjs/common';
import { MemberQueryRepository } from '../domain/repository/member-query.repository';
import { MemberCondition } from '../../global/common/domain/repository/dto/member.condition';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Member } from '../domain/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberResponse } from '../interfaces/dto/member.response';
import { plainToInstance } from 'class-transformer';
import { PagingResponse } from '../../global/common/interface/dto/response/paging.response';
import { SortEnum } from '../../global/common/domain/enum/sort.enum';

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
    this.eqRole(queryBuilder, condition.role);

    const result = (await queryBuilder.getRawOne()) as unknown;
    return plainToInstance(MemberResponse, result);
  }

  async findAll(condition: MemberCondition): Promise<MemberResponse[] | PagingResponse<MemberResponse> | []> {
    const queryBuilder = this.memberRepository
      .createQueryBuilder('member')
      .select(['member.id as _id', 'member.email as _email', 'member.password as _password', 'member.role as _role']);

    this.eqId(queryBuilder, condition.id);
    this.eqEmail(queryBuilder, condition.email);
    this.eqRole(queryBuilder, condition.role);

    let idSort: SortEnum | null = null;

    condition.sort.forEach(sort => {
      const { field, orderBy } = sort;
      queryBuilder.addOrderBy(`member.${field}`, orderBy.code as 'ASC' | 'DESC');

      if (field === 'id') {
        idSort = orderBy;
      }
    });

    if (condition.lastId && condition.size && idSort) {
      const operator = idSort === SortEnum.ASC ? '>' : '<';

      const totalCount = await queryBuilder.getCount();

      queryBuilder.andWhere(`member.id ${operator} :lastId`, { lastId: condition.lastId });
      queryBuilder.limit(condition.getLimit());

      const results = await queryBuilder.getRawMany();

      return new PagingResponse<MemberResponse>(
        null,
        condition.size,
        totalCount,
        results.length,
        results.map(result => plainToInstance(MemberResponse, result) as unknown as MemberResponse),
      );
    }

    if (condition.page && condition.size) {
      const totalCount = await queryBuilder.getCount();

      queryBuilder.offset(condition.getOffset());
      queryBuilder.limit(condition.getLimit());

      const results = await queryBuilder.getRawMany();

      return new PagingResponse<MemberResponse>(
        condition.page,
        condition.size,
        totalCount,
        results.length,
        results.map(result => plainToInstance(MemberResponse, result) as unknown as MemberResponse),
      );
    }

    const results = await queryBuilder.getRawMany();
    return results.map(result => plainToInstance(MemberResponse, result) as unknown as MemberResponse);
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

  private eqRole(queryBuilder: SelectQueryBuilder<Member>, role?: string | null): void {
    if (!role) {
      return;
    }

    queryBuilder.andWhere('member.role = :role', { role });
  }
}
