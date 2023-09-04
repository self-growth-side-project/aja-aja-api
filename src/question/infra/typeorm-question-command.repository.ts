import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from '../../global/common/infra/repository/typeorm-base.repository';
import { EntityTarget } from 'typeorm';
import { Question } from '../domain/entity/question.entity';
import { QuestionCommandRepository } from '../domain/repository/question-command.repository';

@Injectable()
export class TypeormQuestionCommandRepository
  extends TypeormBaseRepository<Question>
  implements QuestionCommandRepository
{
  getName(): EntityTarget<Question> {
    return Question.name;
  }

  async findTopByOrderBySeqAsc(): Promise<Question | null> {
    const results = await this.getRepository().find({
      order: { seq: 'ASC' },
      take: 1,
    });

    return results[0] || null;
  }

  async findBySeq(seq: number): Promise<Question | null> {
    return await this.getRepository().findOne({
      where: { seq: seq },
    });
  }
}
