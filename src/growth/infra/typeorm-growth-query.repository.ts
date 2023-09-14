import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GrowthQueryRepository } from '../domain/repository/growth-query.repository';
import { Answer } from '../../question/domain/entity/answer.entity';
import { GrowthCondition } from '../domain/repository/dto/growth.condition';
import { GrowthMonthResponse } from '../interface/dto/response/growth-month.response';
import { Period } from '../../global/common/domain/vo/period.vo';
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

    const results: GrowthMonthResponse[] = (await queryBuilder.getRawMany()).map(
      result => new GrowthMonthResponse(result._date, result._count),
    );

    return this.fillMissingDates(condition.period, results);
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

  private fillMissingDates(period: Period, results: GrowthMonthResponse[]): GrowthMonthResponse[] {
    const start = TimeUtil.convertLocalDateTimeToKST(period.start).toLocalDate();
    const end = TimeUtil.convertLocalDateTimeToKST(period.end).toLocalDate();

    const resultMap = new Map<string, GrowthMonthResponse>();
    results.forEach(result => {
      resultMap.set(result.date.toString(), result);
    });

    const completeResults: GrowthMonthResponse[] = [];

    let current = start;

    while (current.isBefore(end) || current.equals(end)) {
      const result = resultMap.get(current.toString()) || new GrowthMonthResponse(current, 0);
      completeResults.push(result);
      current = current.plusDays(1);
    }

    return completeResults;
  }
}
