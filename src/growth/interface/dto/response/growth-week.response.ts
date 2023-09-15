import { Exclude, Expose } from 'class-transformer';
import { LocalDate, LocalDateTime } from '@js-joda/core';
import { FromLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { TimeUtil } from '../../../../global/util/time.util';
import { NumberUtil } from '../../../../global/util/number.util';

export class GrowthWeekItemResponse {
  @Exclude({ toPlainOnly: true }) private readonly _answerId: number;
  @Exclude({ toPlainOnly: true }) private readonly _answerContent: string | undefined;
  @Exclude({ toPlainOnly: true }) private readonly _questionTitle: string | undefined;
  @Exclude({ toPlainOnly: true }) private readonly _wiseManOpinion: string | undefined;

  public constructor(
    answerId: number,
    answerContent: string | undefined,
    questionTitle: string | undefined,
    wiseManOpinion: string | undefined,
  ) {
    this._answerId = answerId;
    this._answerContent = answerContent;
    this._questionTitle = questionTitle;
    this._wiseManOpinion = wiseManOpinion;
  }

  @Expose()
  get answerId(): number {
    return this._answerId;
  }

  @Expose()
  get answerContent(): string | undefined {
    return this._answerContent;
  }

  @Expose()
  get questionTitle(): string | undefined {
    return this._questionTitle;
  }

  @Expose()
  get wiseManOpinion(): string | undefined {
    return this._wiseManOpinion;
  }
}

export class GrowthWeekResponse {
  @Exclude({ toPlainOnly: true }) private readonly _date: LocalDate;
  @Exclude({ toPlainOnly: true }) private readonly _answerId: number | undefined;
  @Exclude({ toPlainOnly: true }) private readonly _answerContent: string | undefined;
  @Exclude({ toPlainOnly: true }) private readonly _questionTitle: string | undefined;
  @Exclude({ toPlainOnly: true }) private readonly _wiseManOpinion: string | undefined;

  constructor(
    date: Date | LocalDate,
    answerId?: string | undefined,
    answerContent?: string | undefined,
    questionTitle?: string | undefined,
    wiseManOpinion?: string | undefined,
  ) {
    this._date =
      date instanceof Date
        ? TimeUtil.convertLocalDateTimeToKST(TimeUtil.toLocalDateTimeByDate(date) as LocalDateTime).toLocalDate()
        : date;
    this._answerId = NumberUtil.parseInt(answerId) as number;
    this._answerContent = answerContent;
    this._questionTitle = questionTitle;
    this._wiseManOpinion = wiseManOpinion;
  }

  @Expose()
  @FromLocalDate()
  get date(): LocalDate {
    return this._date;
  }

  @Expose()
  get item(): GrowthWeekItemResponse | null {
    return this._answerId
      ? new GrowthWeekItemResponse(this._answerId, this._answerContent, this._questionTitle, this._wiseManOpinion)
      : null;
  }
}
