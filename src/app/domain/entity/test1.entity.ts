import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';

@Entity({ name: 'test1' })
export class Test1Entity extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer(), comment: '고유 식별 ID' })
  public readonly id: number;

  @Column({ type: 'varchar', length: 320, comment: 'test' })
  public readonly test: string;
}
