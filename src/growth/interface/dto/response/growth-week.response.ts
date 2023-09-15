import { Exclude, Expose } from 'class-transformer';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { FromLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { TimeUtil } from '../../../../global/util/time.util';

export class GrowthWeekResponse {
  @Exclude({ toPlainOnly: true }) private readonly _date: LocalDate;

  constructor(date: Date | LocalDate) {
    this._date =
      date instanceof Date
        ? TimeUtil.convertLocalDateTimeToKST(TimeUtil.toLocalDateTimeByDate(date) as LocalDateTime).toLocalDate()
        : date;
  }

  @Expose()
  @FromLocalDate()
  get date(): LocalDate {
    return this._date;
  }
}
