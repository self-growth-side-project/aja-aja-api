import { Exclude, Expose } from 'class-transformer';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { FromLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { TimeUtil } from '../../../../global/util/time.util';

export class GrowthMonthResponse {
  @Exclude({ toPlainOnly: true }) private readonly _date: Date;
  @Exclude({ toPlainOnly: true }) private readonly _count: number;

  constructor(date: Date, count: number) {
    this._date = date;
    this._count = count;
  }

  @Expose()
  @FromLocalDate()
  get date(): LocalDate {
    const localDateTime = TimeUtil.toLocalDateTimeByDate(this._date) as LocalDateTime;

    return TimeUtil.convertLocalDateTimeToKST(localDateTime).toLocalDate();
  }

  @Expose()
  get isAnswered(): boolean {
    return this._count > 0;
  }
}
