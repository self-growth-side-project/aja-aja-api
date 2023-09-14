import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { GrowthCondition } from '../../../domain/repository/dto/growth.condition';
import { ValidationMessage } from '../../../../global/common/constant/validation.message';
import { StringUtil } from '../../../../global/util/string.util';
import { BadRequestException } from '../../../../global/exception/bad-request.exception';
import { Period } from '../../../../global/common/domain/vo/period.vo';
import { NumberUtil } from '../../../../global/util/number.util';
import { GlobalContextUtil } from '../../../../global/util/global-context.util';

export class SearchMonthGrowthRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: ValidationMessage.date.isYearAndMonthFormat })
  public date: string;

  public toCondition(): GrowthCondition {
    const splitDate = StringUtil.split(this.date, '-');

    if (!splitDate) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PARAMETER, this.date);
    }

    const year = NumberUtil.parseInt(splitDate[0]);
    const month = NumberUtil.parseInt(splitDate[1]);

    if (!year || !month) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PARAMETER, this.date);
    }

    return GrowthCondition.of(GlobalContextUtil.getMember().id, Period.createForMonthInKST(year, month));
  }
}
