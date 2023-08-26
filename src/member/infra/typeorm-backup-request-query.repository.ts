import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BackupRequestQueryRepository } from '../domain/repository/backup-request-query.repository';
import { BackupRequest } from '../domain/entity/backup-request.entity';
import { BackupRequestCondition } from '../domain/repository/dto/backup-request.condition';

@Injectable()
export class TypeormBackupRequestQueryRepository implements BackupRequestQueryRepository {
  constructor(
    @InjectRepository(BackupRequest)
    private readonly backupRequestRepository: Repository<BackupRequest>,
  ) {}

  async count(condition: BackupRequestCondition): Promise<number> {
    const queryBuilder = this.backupRequestRepository.createQueryBuilder('backupRequest');

    this.eqMemberId(queryBuilder, condition.memberId);
    this.eqStatus(queryBuilder, condition.status);

    return await queryBuilder.getCount();
  }

  private eqMemberId(queryBuilder: SelectQueryBuilder<BackupRequest>, memberId?: number | null): void {
    if (!memberId) {
      return;
    }

    queryBuilder.andWhere('backupRequest.member.id = :memberId', { memberId });
  }

  private eqStatus(queryBuilder: SelectQueryBuilder<BackupRequest>, status?: string | null): void {
    if (!status) {
      return;
    }

    queryBuilder.andWhere('backupRequest.status = :status', { status });
  }
}
