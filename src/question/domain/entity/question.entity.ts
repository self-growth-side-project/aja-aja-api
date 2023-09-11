import { Column, DeleteDateColumn, Entity, Generated, PrimaryColumn } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '../../../global/common/infra/transformer/local-date-time.transformer';

@Entity()
export class Question extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer() })
  public readonly id: number;

  @Column({ type: 'varchar', length: 255 })
  public readonly title: string;

  @Column({ type: 'text' })
  public readonly content: string;

  @Column({ type: 'text' })
  public readonly wiseManOpinion: string;

  @Column({ type: 'int' })
  public readonly seq: number;

  @DeleteDateColumn({ type: 'timestamp', transformer: new LocalDateTimeTransformer(), nullable: true, precision: 0 })
  public readonly deletedAt!: LocalDateTime | null;

  public getNextSeq(): number {
    return this.seq + 1;
  }

  public isEqualToId(id: number): boolean {
    return this.id === id;
  }
}
