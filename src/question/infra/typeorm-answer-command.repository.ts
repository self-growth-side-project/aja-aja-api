import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from '../../global/common/infra/repository/typeorm-base.repository';
import { EntityTarget } from 'typeorm';
import { Answer } from '../domain/entity/answer.entity';
import { AnswerCommandRepository } from '../domain/repository/answer-command.repository';

@Injectable()
export class TypeormAnswerCommandRepository extends TypeormBaseRepository<Answer> implements AnswerCommandRepository {
  getName(): EntityTarget<Answer> {
    return Answer.name;
  }

  async findByIdAndQuestionIdAndMemberId(id: number, questionId: number, memberId: number): Promise<Answer | null> {
    return await this.getRepository().findOne({
      where: { id: id, 'question.id': questionId, 'member.id': memberId } as any,
    });
  }

  async findTopByMemberIdAndOrderByIdDesc(memberId: number): Promise<Answer | null> {
    return await this.getRepository().findOne({
      where: { 'member.id': memberId } as any,
      order: { id: 'DESC' },
    });
  }

  async findByQuestionIdAndMemberId(questionId: number, memberId: number): Promise<Answer | null> {
    return await this.getRepository().findOne({
      where: { 'question.id': questionId, 'member.id': memberId } as any,
    });
  }
}
