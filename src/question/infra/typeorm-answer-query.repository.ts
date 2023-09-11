import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AnswerQueryRepository } from '../domain/repository/answer-query.repository';
import { Answer } from '../domain/entity/answer.entity';
import { AnswerCondition } from '../domain/repository/dto/answer.condition';
import { AnswerResponse } from '../interface/dto/response/answer.response';

@Injectable()
export class TypeormAnswerQueryRepository implements AnswerQueryRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async find(condition: AnswerCondition): Promise<AnswerResponse | null> {
    const queryBuilder = this.answerRepository
      .createQueryBuilder('answer')
      .select(['answer.id as _id', 'answer.content as _content']);

    this.eqQuestionId(queryBuilder, condition.questionId);
    this.eqMemberId(queryBuilder, condition.memberId);

    const result = (await queryBuilder.getRawOne()) as unknown;
    return plainToInstance(AnswerResponse, result);
  }

  private eqQuestionId(queryBuilder: SelectQueryBuilder<Answer>, questionId?: number | null): void {
    if (!questionId) {
      return;
    }

    queryBuilder.andWhere('answer.question.id = :questionId', { questionId });
  }

  private eqMemberId(queryBuilder: SelectQueryBuilder<Answer>, memberId?: number | null): void {
    if (!memberId) {
      return;
    }

    queryBuilder.andWhere('answer.member.id = :memberId', { memberId });
  }
}
