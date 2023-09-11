import { Question } from '../entity/question.entity';

export interface QuestionCommandRepository {
  findById(id: number): Promise<Question | null>;

  findTopByOrderBySeqAsc(): Promise<Question | null>;

  findBySeq(seq: number): Promise<Question | null>;

  softRemove(question: Question): Promise<void>;
}

export const QuestionCommandRepository = Symbol('QuestionCommandRepository');
