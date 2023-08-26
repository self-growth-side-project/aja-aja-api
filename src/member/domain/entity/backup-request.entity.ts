import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BigintTransformer } from '../../../global/common/domain/transformer/bigint.transformer';
import { Member } from './member.entity';
import { BaseAuditEntity } from '../../../global/common/domain/entity/base-audit.entity';
import { BackupStatus } from '../enum/BackupStatus';
import { BackupStatusTransformer } from '../../infra/transformer/BackupStatusTransformer';

@Entity()
export class BackupRequest extends BaseAuditEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer() })
  public readonly id: number;

  @ManyToOne(() => Member, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  public readonly member: Member;

  @Column({ type: 'varchar', length: 10, transformer: new BackupStatusTransformer() })
  public readonly role: BackupStatus;
}
