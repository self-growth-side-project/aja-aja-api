import { LocalDate, LocalDateTime } from '@js-joda/core';
import { TimeUtil } from '../../../src/global/util/time.util';

describe('TimeUtil', () => {
  describe('toString()', () => {
    it('LocalDate 를 입력하면 yyyy-MM-dd 반환되는지 확인', () => {
      expect(TimeUtil.toString(LocalDate.of(2023, 7, 3))).toBe('2023-07-03');
    });

    it('LocalDateTime 을 입력하면 yyyy-MM-dd HH:mm:ss 반환되는지 확인', () => {
      expect(TimeUtil.toString(LocalDateTime.of(2023, 7, 3, 14, 30))).toBe('2023-07-03 14:30:00');
    });
  });

  describe('toDate()', () => {
    it('LocalDate 를 입력하면 Date 가 반환되는지 확인', () => {
      expect(TimeUtil.toDate(LocalDate.of(2023, 7, 3))).toEqual(new Date(2023, 6, 3));
    });

    it('LocalDateTime 을 입력하면 Date 가 반환되는지 확인', () => {
      expect(TimeUtil.toDate(LocalDateTime.of(2023, 7, 3, 14, 30))).toEqual(new Date(2023, 6, 3, 14, 30)); // JavaScript의 Date는 월이 0부터 시작합니다.
    });
  });

  describe('toLocalDate()', () => {
    it('Date 를 입력하면 LocalDate 가 반환되는지 확인', () => {
      expect(TimeUtil.toLocalDate(new Date(2023, 6, 3))).toEqual(LocalDate.of(2023, 7, 3));
    });
  });

  describe('toLocalDateTime()', () => {
    it('Date 를 입력하면 LocalDateTime 이 반환되는지 확인', () => {
      expect(TimeUtil.toLocalDateTime(new Date(2023, 6, 3, 14, 30))).toEqual(LocalDateTime.of(2023, 7, 3, 14, 30));
    });
  });

  describe('toLocalDateBy()', () => {
    it('입력된 문자열을 LocalDate 로 반환하는지 확인', () => {
      expect(TimeUtil.toLocalDateBy('2023-07-03')).toEqual(LocalDate.of(2023, 7, 3));
    });
  });

  describe('toLocalDateTimeBy()', () => {
    it('입력된 문자열을 LocalDateTime 으로 반환하는지 확인', () => {
      expect(TimeUtil.toLocalDateTimeBy('2023-07-03 14:30:00')).toEqual(LocalDateTime.of(2023, 7, 3, 14, 30));
    });
  });
});
