import { Answer } from '../entity/answer.entity';

export interface AnswerCommandRepository {
  findTopByMemberIdAndOrderByIdDesc(memberId: number): Promise<Answer | null>;

  softRemove(answer: Answer): Promise<void>;
}

export const AnswerCommandRepository = Symbol('AnswerCommandRepository');
