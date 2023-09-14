import { IsNotEmpty } from 'class-validator';
import { SearchGrowthCondition } from '../../../domain/repository/dto/search-growth.condition';
import { LocalDate } from '@js-joda/core';
import { ToLocalDate } from '../../../../global/common/decorator/transformer.decorator';

export class SearchWeekGrowthRequest {
  @IsNotEmpty()
  @ToLocalDate()
  public date: LocalDate;

  public toCondition(): SearchGrowthCondition {
    return SearchGrowthCondition.of(null);
  }
}
