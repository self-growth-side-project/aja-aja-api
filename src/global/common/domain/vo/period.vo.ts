import { Column } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '../../infra/transformer/local-date-time.transformer';
import { TimeUtil } from '../../../util/time.util';

export class Period {
  @Column({
    name: 'start_dt',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
  })
  private readonly _start: LocalDateTime;

  @Column({
    name: 'end_dt',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
  })
  private readonly _end: LocalDateTime;

  private constructor(start: LocalDateTime, end: LocalDateTime) {
    this._start = start;
    this._end = end;
  }

  public static createForTodayInKST(): Period {
    return new Period(TimeUtil.getStartOfTodayFromKST(), TimeUtil.getEndOfTodayFromKST());
  }

  public isWithinRange(time: LocalDateTime): boolean {
    return (
      (time.isAfter(this._start) || time.isEqual(this._start)) && (time.isBefore(this._end) || time.isEqual(this._end))
    );
  }

  get start(): LocalDateTime {
    return this._start;
  }

  get end(): LocalDateTime {
    return this._end;
  }
}
