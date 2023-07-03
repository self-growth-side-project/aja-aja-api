import { convert, DateTimeFormatter, LocalDate, LocalDateTime, nativeJs } from '@js-joda/core';

export class TimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss');

  static toString(value: LocalDate | LocalDateTime): string | null {
    if (!value) {
      return null;
    }

    if (value instanceof LocalDate) {
      return value.format(this.DATE_FORMATTER);
    }
    return value.format(this.DATE_TIME_FORMATTER);
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

    return LocalDate.parse(strDate, TimeUtil.DATE_FORMATTER);
  }

  static toLocalDateTimeBy(strDate: string): LocalDateTime | null {
    if (!strDate) {
      return null;
    }

    return LocalDateTime.parse(strDate, TimeUtil.DATE_TIME_FORMATTER);
  }
}
