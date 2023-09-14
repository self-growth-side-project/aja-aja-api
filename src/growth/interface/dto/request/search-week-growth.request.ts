import { IsNotEmpty } from 'class-validator';
import { GrowthCondition } from '../../../domain/repository/dto/growth.condition';
import { LocalDate } from '@js-joda/core';
import { ToLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { GlobalContextUtil } from '../../../../global/util/global-context.util';
import { Period } from '../../../../global/common/domain/vo/period.vo';

export class SearchWeekGrowthRequest {
  @IsNotEmpty()
  @ToLocalDate()
  public date: LocalDate;

  public toCondition(): GrowthCondition {
    return GrowthCondition.of(GlobalContextUtil.getMember().id, Period.createForTodayInKST());
  }
}
