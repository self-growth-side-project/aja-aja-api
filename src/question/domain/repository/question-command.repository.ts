import { Question } from '../entity/question.entity';

export interface QuestionCommandRepository {
  findTopByOrderBySeqAsc(): Promise<Question | null>;

  findBySeq(seq: number): Promise<Question | null>;
}

export const QuestionCommandRepository = Symbol('QuestionCommandRepository');
