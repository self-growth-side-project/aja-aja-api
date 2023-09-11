import { BaseCondition } from '../../../../global/common/domain/repository/dto/base.condition';
import { SortOptionCondition } from '../../../../global/common/domain/repository/dto/sort-option.condition';

export class AnswerCondition extends BaseCondition {
  questionId?: number | null | undefined;

  memberId?: number | null | undefined;

  private constructor(
    page?: number | null | undefined,
    size?: number | null | undefined,
    lastId?: number | null | undefined,
    sort?: SortOptionCondition[] | null | undefined,
    questionId?: number | null | undefined,
    memberId?: number | null | undefined,
  ) {
    super(page, size, lastId, sort);
    this.questionId = questionId;
    this.memberId = memberId;
  }

  public static of(
    page?: number | null | undefined,
    size?: number | null | undefined,
    lastId?: number | null | undefined,
    sort?: SortOptionCondition[] | null | undefined,
    questionId?: number | null | undefined,
    memberId?: number | null | undefined,
  ): AnswerCondition {
    return new AnswerCondition(page, size, lastId, sort, questionId, memberId);
  }
}
