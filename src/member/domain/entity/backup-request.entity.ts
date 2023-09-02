import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { Member } from './member.entity';
import { BaseAuditEntity } from '../../../global/common/domain/entity/base-audit.entity';
import { BackupRequestStatus } from '../enum/BackupRequestStatus';
import { BackupRequestStatusTransformer } from '../../infra/transformer/BackupRequestStatusTransformer';

@Entity()
export class BackupRequest extends BaseAuditEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer() })
  public readonly id: number;

  @ManyToOne(() => Member, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  public readonly member: Member;

  @Column({ type: 'varchar', length: 10, transformer: new BackupRequestStatusTransformer() })
  public readonly status: BackupRequestStatus;

  private constructor(member: Member, status: BackupRequestStatus) {
    super();
    this.member = member;
    this.status = status;
  }
  public static createPendingRequest(member: Member): BackupRequest {
    return new BackupRequest(member, BackupRequestStatus.PENDING);
  }
}
