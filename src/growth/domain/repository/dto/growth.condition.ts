import { Period } from '../../../../global/common/domain/vo/period.vo';

export class GrowthCondition {
  memberId: number;

  period: Period;

  private constructor(memberId: number, period: Period) {
    this.memberId = memberId;
    this.period = period;
  }

  public static of(memberId: number, period: Period): GrowthCondition {
    return new GrowthCondition(memberId, period);
  }
}
