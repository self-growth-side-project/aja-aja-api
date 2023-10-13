import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { AppOsType } from '../../../global/common/domain/enum/app-os-type.enum';
import { AppOsTypeTransformer } from '../../infra/transformer/app-os-type.transformer';

@Entity({ name: 'app_version' })
export class AppVersionEntity extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer(), comment: '고유 식별 ID' })
  public readonly id: number;

  @Column({ type: 'varchar', length: 10, transformer: new AppOsTypeTransformer(), comment: 'os type' })
  public readonly appOsType: AppOsType;

  @Column({ type: 'varchar', length: 320, comment: '최신버전' })
  public readonly latestVersion: string;

  @Column({ type: 'varchar', length: 11, comment: '권장 업데이트가 필요한 대상의 최대 버전' })
  public readonly recommendedThresholdVersion: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '권장 업데이트 내용 제목' })
  public readonly recommendedTitle?: string;

  @Column({ type: 'text', nullable: true, comment: '권장 업데이트 내용 본문' })
  public readonly recommendedMessage?: string;

  @Column({ type: 'varchar', length: 11, comment: '강제 업데이트가 필요한 대상의 최대 버전' })
  public readonly forceThresholdVersion: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '강제 업데이트 내용 제목' })
  public readonly forceTitle: string;

  @Column({ type: 'text', nullable: true, comment: '강제 업데이트 내용 본문' })
  public readonly forceMessage: string;
}
