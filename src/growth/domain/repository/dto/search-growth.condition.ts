import { Period } from '../../../../global/common/domain/vo/period.vo';

export class SearchGrowthCondition {
  period?: Period | null | undefined;

  private constructor(period?: Period | null | undefined) {
    this.period = period;
  }

  public static of(period?: Period | null | undefined): SearchGrowthCondition {
    return new SearchGrowthCondition(period);
  }
}
