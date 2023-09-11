import { AnswerResponse } from '../../interface/dto/response/answer.response';
import { AnswerCondition } from './dto/answer.condition';

export interface AnswerQueryRepository {
  find(condition: AnswerCondition): Promise<AnswerResponse | null>;
}

export const AnswerQueryRepository = Symbol('AnswerQueryRepository');
