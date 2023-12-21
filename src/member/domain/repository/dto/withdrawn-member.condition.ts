import { BaseCondition } from '../../../../global/common/domain/repository/dto/base.condition';
import { SortOptionCondition } from '../../../../global/common/domain/repository/dto/sort-option.condition';

export class WithdrawnMemberCondition extends BaseCondition {
  private constructor(
    page?: number | null | undefined,
    size?: number | null | undefined,
    lastId?: number | null | undefined,
    sort?: SortOptionCondition[] | null | undefined,
  ) {
    super(page, size, lastId, sort);
  }

  public static of(
    page?: number | null | undefined,
    size?: number | null | undefined,
    lastId?: number | null | undefined,
    sort?: SortOptionCondition[] | null | undefined,
  ): WithdrawnMemberCondition {
    return new WithdrawnMemberCondition(page, size, lastId, sort);
  }
}
