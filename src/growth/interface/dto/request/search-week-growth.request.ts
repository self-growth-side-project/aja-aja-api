import { IsOptional } from 'class-validator';
import { GrowthCondition } from '../../../domain/repository/dto/growth.condition';
import { LocalDate } from '@js-joda/core';
import { ToLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { GlobalContextUtil } from '../../../../global/util/global-context.util';
import { Period } from '../../../../global/common/domain/vo/period.vo';
import { TimeUtil } from '../../../../global/util/time.util';

export class SearchWeekGrowthRequest {
  @IsOptional()
  @ToLocalDate()
  public date: LocalDate;

  public toCondition(): GrowthCondition {
    if (!this.date) {
      this.date = TimeUtil.getLocalDateInKST();
    }

    return GrowthCondition.of(GlobalContextUtil.getMember().id, Period.createForWeekInKST(this.date));
  }
}
