import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { SearchGrowthCondition } from '../../../domain/repository/dto/search-growth.condition';
import { ValidationMessage } from '../../../../global/common/constant/validation.message';

export class SearchMonthGrowthRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: ValidationMessage.date.isYearAndMonthFormat })
  public date: string;

  public toCondition(): SearchGrowthCondition {
    return SearchGrowthCondition.of(null);
  }
}
