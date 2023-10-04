import {
  ChronoUnit,
  convert,
  DateTimeFormatter,
  Duration,
  Instant,
  LocalDate,
  LocalDateTime,
  LocalTime,
  nativeJs,
  ZonedDateTime,
  ZoneId,
} from '@js-joda/core';
import '@js-joda/timezone';
import { BadRequestException } from '../exception/bad-request.exception';

export class TimeUtil {
  private static readonly DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static readonly DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');
  public static readonly YYYY_MM_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM');
  private static readonly UTC_ZONE_ID = ZoneId.of('UTC');
  private static readonly KST_ZONE_ID = ZoneId.of('Asia/Seoul');
  private static readonly LOCAL_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  private static readonly MAX_TIME = LocalTime.MAX.truncatedTo(ChronoUnit.SECONDS);

  static toString(value: LocalDate | LocalDateTime): string | null {
    if (!value) {
      return null;
    }

    if (value instanceof LocalDate) {
      return this.format(value, this.DATE_FORMATTER);
    }

    return this.format(value, this.DATE_TIME_FORMATTER);
  }

  static format(target: LocalDate | LocalDateTime, formatter: DateTimeFormatter): string | null {
    if (!target) {
      return null;
    }

    return target.format(formatter);
  }

  static toDate(localDate: LocalDate | LocalDateTime): Date | null {
    if (!localDate) {
      return null;
    }

    return convert(localDate).toDate();
  }

  static toLocalDate(date: Date): LocalDate | null {
    if (!date) {
      return null;
    }
    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime | null {
    if (!date) {
      return null;
    }
    return LocalDateTime.from(nativeJs(date));
  }

  static toLocalDateBy(strDate: string): LocalDate | null {
    if (!strDate) {
      return null;
    }

    if (!this.LOCAL_DATE_PATTERN.test(strDate)) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PARAMETER, strDate);
    }

    return LocalDate.parse(strDate, TimeUtil.DATE_FORMATTER);
  }

  static toLocalDateTimeBy(strDate: string): LocalDateTime | null {
    if (!strDate) {
      return null;
    }

    return LocalDateTime.parse(strDate, TimeUtil.DATE_TIME_FORMATTER);
  }

  static toLocalDateTimeByDate(strDate: Date): LocalDateTime | null {
    if (!strDate) {
      return null;
    }

    return ZonedDateTime.ofInstant(Instant.parse(strDate.toISOString()), this.UTC_ZONE_ID).toLocalDateTime();
  }

  static getStartOfTodayFromKST(): LocalDateTime {
    return ZonedDateTime.of(LocalDateTime.of(LocalDate.now(TimeUtil.KST_ZONE_ID), LocalTime.MIN), TimeUtil.KST_ZONE_ID)
      .withZoneSameInstant(TimeUtil.UTC_ZONE_ID)
      .toLocalDateTime();
  }

  static getEndOfTodayFromKST(): LocalDateTime {
    return ZonedDateTime.of(LocalDateTime.of(LocalDate.now(TimeUtil.KST_ZONE_ID), this.MAX_TIME), TimeUtil.KST_ZONE_ID)
      .withZoneSameInstant(TimeUtil.UTC_ZONE_ID)
      .toLocalDateTime();
  }

  static getLocalDateInKST(): LocalDate {
    return LocalDate.now(TimeUtil.KST_ZONE_ID);
  }

  static getLocalDateTimeInKST(): LocalDateTime {
    return LocalDateTime.now(TimeUtil.KST_ZONE_ID);
  }

  static convertLocalDateTimeToKST(time: LocalDateTime): LocalDateTime {
    return ZonedDateTime.of(time, TimeUtil.UTC_ZONE_ID).withZoneSameInstant(TimeUtil.KST_ZONE_ID).toLocalDateTime();
  }

  static convertLocalDateTimeToUTC(time: LocalDateTime): LocalDateTime {
    return ZonedDateTime.of(time, TimeUtil.KST_ZONE_ID).withZoneSameInstant(TimeUtil.UTC_ZONE_ID).toLocalDateTime();
  }

  static getFirstDayOfMonthFromKST(year: number, month: number): LocalDateTime {
    return ZonedDateTime.of(LocalDateTime.of(LocalDate.of(year, month, 1), LocalTime.MIN), this.KST_ZONE_ID)
      .withZoneSameInstant(this.UTC_ZONE_ID)
      .toLocalDateTime();
  }

  static getLastDayOfMonthFromKST(year: number, month: number): LocalDateTime {
    const firstDay = LocalDate.of(year, month, 1);
    const lastDay = firstDay.withDayOfMonth(firstDay.lengthOfMonth());

    return ZonedDateTime.of(LocalDateTime.of(lastDay, this.MAX_TIME), this.KST_ZONE_ID)
      .withZoneSameInstant(this.UTC_ZONE_ID)
      .toLocalDateTime();
  }

  static getMinLocalDateTimeByLocalDate(localDate: LocalDate): LocalDateTime {
    return LocalDateTime.of(localDate, LocalTime.MIN);
  }

  static getMaxLocalDateTimeByLocalDate(localDate: LocalDate): LocalDateTime {
    return LocalDateTime.of(localDate, this.MAX_TIME);
  }

  static getMillisOfDuration(from: LocalDateTime, to: LocalDateTime): number {
    return Duration.between(from, to).toMillis();
  }
}
