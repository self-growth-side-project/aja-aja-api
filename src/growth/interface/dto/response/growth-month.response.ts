import { Exclude, Expose } from 'class-transformer';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { FromLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { TimeUtil } from '../../../../global/util/time.util';

export class GrowthMonthResponse {
  @Exclude({ toPlainOnly: true }) private readonly _date: LocalDate;
  @Exclude({ toPlainOnly: true }) private readonly _count: number;

  constructor(date: Date | LocalDate, count: number) {
    this._date =
      date instanceof Date
        ? TimeUtil.convertLocalDateTimeToKST(TimeUtil.toLocalDateTimeByDate(date) as LocalDateTime).toLocalDate()
        : date;
    this._count = count;
  }

  @Expose()
  @FromLocalDate()
  get date(): LocalDate {
    return this._date;
  }

  @Expose()
  get isAnswered(): boolean {
    return this._count > 0;
  }
}
