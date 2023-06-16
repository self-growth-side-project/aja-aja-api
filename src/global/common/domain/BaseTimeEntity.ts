import { LocalDateTime } from '@js-joda/core';

export abstract class BaseTimeEntity {
  createdAt: LocalDateTime;

  updatedAt: LocalDateTime;
}
