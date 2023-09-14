import { Answer } from '../entity/answer.entity';

export interface AnswerCommandRepository {
  save(answer: Answer): Promise<Answer>;

  findByIdAndQuestionIdAndMemberId(id: number, questionId: number, memberId: number): Promise<Answer | null>;

  findTopByMemberIdAndOrderByIdDesc(memberId: number): Promise<Answer | null>;

  findByQuestionIdAndMemberId(questionId: number, memberId: number): Promise<Answer | null>;

  softRemove(answer: Answer): Promise<void>;
}

export const AnswerCommandRepository = Symbol('AnswerCommandRepository');
