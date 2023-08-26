import { LocalDateTime } from '@js-joda/core';
import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { LocalDateTimeTransformer } from '../transformer/local-date-time.transformer';
import { BaseEntity } from './base.entity';

export abstract class BaseAuditEntity extends BaseEntity {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', transformer: new LocalDateTimeTransformer() })
  public createdAt: LocalDateTime;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: new LocalDateTimeTransformer(),
  })
  public updatedAt: LocalDateTime;

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
