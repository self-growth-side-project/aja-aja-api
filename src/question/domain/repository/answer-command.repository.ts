import { Answer } from '../entity/answer.entity';

export interface AnswerCommandRepository {
  findTopByMemberIdAndOrderByIdDesc(memberId: number): Promise<Answer | null>;
}

export const AnswerCommandRepository = Symbol('AnswerCommandRepository');
