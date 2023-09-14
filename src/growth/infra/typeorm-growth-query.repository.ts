import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GrowthQueryRepository } from '../domain/repository/growth-query.repository';
import { Answer } from '../../question/domain/entity/answer.entity';
import { GrowthCondition } from '../domain/repository/dto/growth.condition';
import { GrowthMonthResponse } from '../interface/dto/response/growth-month.response';
import { Period } from '../../global/common/domain/vo/period.vo';
import { plainToInstance } from 'class-transformer';
import { SortEnum } from '../../global/common/domain/enum/sort.enum';
import { TimeUtil } from '../../global/util/time.util';

@Injectable()
export class TypeormGrowthQueryRepository implements GrowthQueryRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async getGrowthStatusByMonth(condition: GrowthCondition): Promise<GrowthMonthResponse[]> {
    const queryBuilder = this.answerRepository
      .createQueryBuilder('answer')
      .select('answer.createdAt as _date')
      .addSelect('count(1) as _count');

    this.eqMemberId(queryBuilder, condition.memberId);
    this.betweenCreatedAt(queryBuilder, condition.period);

    queryBuilder.addOrderBy(`answer.createdAt`, SortEnum.ASC.code as 'ASC' | 'DESC');
    queryBuilder.addGroupBy(`answer.createdAt`);

    const results = (await queryBuilder.getRawMany()).map(
      result => plainToInstance(GrowthMonthResponse, result) as unknown as GrowthMonthResponse,
    );

    console.log(
      TimeUtil.convertLocalDateTimeToKST(condition.period.start).toLocalDate(),
      TimeUtil.convertLocalDateTimeToKST(condition.period.end).toLocalDate(),
    );
    console.log(results);

    return results;
  }

  private eqMemberId(queryBuilder: SelectQueryBuilder<Answer>, memberId: number): void {
    queryBuilder.andWhere('answer.member.id = :memberId', { memberId });
  }

  private betweenCreatedAt(queryBuilder: SelectQueryBuilder<Answer>, period: Period): void {
    queryBuilder.andWhere('answer.createdAt BETWEEN :start AND :end', {
      start: period.start.toString(),
      end: period.end.toString(),
    });
  }
}
