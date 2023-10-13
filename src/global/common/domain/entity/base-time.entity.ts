import { LocalDateTime } from '@js-joda/core';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { LocalDateTimeTransformer } from '../../infra/transformer/local-date-time.transformer';
import { BaseEntity } from './base.entity';

export abstract class BaseTimeEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new LocalDateTimeTransformer(),
    comment: '생성 일시',
  })
  createdAt: LocalDateTime;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: new LocalDateTimeTransformer(),
    comment: '수정 일시',
  })
  updatedAt: LocalDateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
