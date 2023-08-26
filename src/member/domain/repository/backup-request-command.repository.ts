import { BackupRequest } from '../entity/backup-request.entity';
import { BackupRequestStatus } from '../enum/BackupRequestStatus';

export interface BackupRequestCommandRepository {
  save(backupRequest: BackupRequest): Promise<BackupRequest>;

  existByMemberIdAndStatus(memberId: number, status: BackupRequestStatus): Promise<boolean>;
}

export const BackupRequestCommandRepository = Symbol('BackupRequestCommandRepository');
