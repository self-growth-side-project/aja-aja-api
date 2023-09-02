import { Transform } from 'class-transformer';
import { TimeUtil } from '../../util/time.util';
import { NumberUtil } from '../../util/number.util';

export function FromLocalDateTime() {
  return Transform(({ value }) => TimeUtil.toString(value), { toPlainOnly: true });
}

export function ToLocalDateTime() {
  return Transform(({ value }) => TimeUtil.toLocalDateTimeBy(value), { toClassOnly: true });
}

export function FromLocalDate() {
  return Transform(({ value }) => TimeUtil.toString(value), { toPlainOnly: true });
}

export function ToLocalDate() {
  return Transform(({ value }) => TimeUtil.toLocalDateBy(value), { toClassOnly: true });
}

export function ToNumber() {
  return Transform(
    ({ value }) => {
      return NumberUtil.isNumber(value) ? value : Number(value);
    },
    { toClassOnly: true },
  );
}
