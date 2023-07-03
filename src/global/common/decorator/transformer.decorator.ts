import { Transform } from 'class-transformer';
import { TimeUtil } from '../../util/time.util';

export function LocalDateTimeToString() {
  return Transform(({ value }) => TimeUtil.toString(value), { toPlainOnly: true });
}

export function LocalDateTimeFromString() {
  return Transform(({ value }) => TimeUtil.toLocalDateTimeBy(value), { toClassOnly: true });
}

export function LocalDateToString() {
  return Transform(({ value }) => TimeUtil.toString(value), { toPlainOnly: true });
}

export function StringToLocalDate() {
  return Transform(({ value }) => TimeUtil.toLocalDateBy(value), { toClassOnly: true });
}
