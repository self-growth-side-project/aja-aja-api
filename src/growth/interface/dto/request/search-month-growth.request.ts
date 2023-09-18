import { IsOptional, IsString, Matches } from 'class-validator';
import { GrowthCondition } from '../../../domain/repository/dto/growth.condition';
import { ValidationMessage } from '../../../../global/common/constant/validation.message';
import { StringUtil } from '../../../../global/util/string.util';
import { BadRequestException } from '../../../../global/exception/bad-request.exception';
import { Period } from '../../../../global/common/domain/vo/period.vo';
import { NumberUtil } from '../../../../global/util/number.util';
import { GlobalContextUtil } from '../../../../global/util/global-context.util';
import { TimeUtil } from '../../../../global/util/time.util';
import { InternalServerException } from '../../../../global/exception/internal-server.exception';

export class SearchMonthGrowthRequest {
  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])$/, { message: ValidationMessage.date.isYearAndMonthFormat })
  public date: string;

  public toCondition(): GrowthCondition {
    if (!this.date) {
      const todayDate = TimeUtil.format(TimeUtil.getLocalDateInKST(), TimeUtil.YYYY_MM_FORMATTER);

      if (!todayDate) {
        throw new InternalServerException(InternalServerException.ErrorCodes.FAILED_TO_GET_TODAY_LOCAL_DATE);
      }

      this.date = todayDate;
    }

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
