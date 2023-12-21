import { Injectable } from '@nestjs/common';
import { getMetadataArgsStorage, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PagingResponse } from '../../global/common/interface/dto/response/paging.response';
import { SortEnum } from '../../global/common/domain/enum/sort.enum';
import { BadRequestException } from '../../global/exception/bad-request.exception';
import { WithdrawnMemberQueryRepository } from '../domain/repository/withdrawn-member-query.repository';
import { WithdrawnMember } from '../domain/entity/withdrawn-member.entity';
import { WithdrawnMemberCondition } from '../domain/repository/dto/withdrawn-member.condition';
import { WithdrawnMemberResponse } from '../interface/dto/response/withdrawn-member.response';

@Injectable()
export class TypeormWithdrawnMemberQueryRepository implements WithdrawnMemberQueryRepository {
  public static readonly ENTITY_FIELD_NAMES = getMetadataArgsStorage()
    .columns.filter(column => column.target === WithdrawnMember)
    .map(column => column.propertyName);

  constructor(
    @InjectRepository(WithdrawnMember)
    private readonly withdrawnMemberRepository: Repository<WithdrawnMember>,
  ) {}

  async findAll(
    condition: WithdrawnMemberCondition,
  ): Promise<WithdrawnMemberResponse[] | PagingResponse<WithdrawnMemberResponse> | []> {
    const queryBuilder = this.withdrawnMemberRepository
      .createQueryBuilder('withdrawnMember')
      .select([
        'withdrawnMember.id as _id',
        'withdrawnMember.memberId as _memberId',
        'withdrawnMember.email as _email',
        'withdrawnMember.role as _role',
        'withdrawnMember.createdAt as _createdAt',
      ]);

    const idSort = this.setOrderBy(condition, queryBuilder);

    if (condition.lastId && condition.size && idSort) {
      return await this.getInfiniteScrollResult(idSort, queryBuilder, condition);
    }

    if (condition.page && condition.size) {
      return await this.getPagingResult(queryBuilder, condition);
    }

    const results = await queryBuilder.getRawMany();
    return results.map(
      result => plainToInstance(WithdrawnMemberResponse, result) as unknown as WithdrawnMemberResponse,
    );
  }

  private setOrderBy(
    condition: WithdrawnMemberCondition,
    queryBuilder: SelectQueryBuilder<WithdrawnMember>,
  ): SortEnum | null {
    let idSort: SortEnum | null = null;

    condition.sort.forEach(sort => {
      const { field, orderBy } = sort;

      if (!TypeormWithdrawnMemberQueryRepository.ENTITY_FIELD_NAMES.includes(field)) {
        throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_SORT_OPTION, {
          field: field,
          orderBy: orderBy.code,
        });
      }

      queryBuilder.addOrderBy(`withdrawnMember.${field}`, orderBy.code as 'ASC' | 'DESC');

      if (field === 'id') {
        idSort = orderBy;
      }
    });

    return idSort;
  }

  private async getInfiniteScrollResult(
    idSort: SortEnum,
    queryBuilder: SelectQueryBuilder<WithdrawnMember>,
    condition: WithdrawnMemberCondition,
  ) {
    const operator = idSort === SortEnum.ASC ? '>' : '<';

    const totalCount = await queryBuilder.getCount();

    queryBuilder.andWhere(`withdrawnMember.id ${operator} :lastId`, { lastId: condition.lastId });
    queryBuilder.limit(condition.getLimit());

    const results = await queryBuilder.getRawMany();

    return new PagingResponse<WithdrawnMemberResponse>(
      null,
      condition.size as number,
      totalCount,
      results.length,
      results.map(result => plainToInstance(WithdrawnMemberResponse, result) as unknown as WithdrawnMemberResponse),
    );
  }

  private async getPagingResult(
    queryBuilder: SelectQueryBuilder<WithdrawnMember>,
    condition: WithdrawnMemberCondition,
  ) {
    const totalCount = await queryBuilder.getCount();

    queryBuilder.offset(condition.getOffset());
    queryBuilder.limit(condition.getLimit());

    const results = await queryBuilder.getRawMany();

    return new PagingResponse<WithdrawnMemberResponse>(
      condition.page as number,
      condition.size as number,
      totalCount,
      results.length,
      results.map(result => plainToInstance(WithdrawnMemberResponse, result) as unknown as WithdrawnMemberResponse),
    );
  }
}
