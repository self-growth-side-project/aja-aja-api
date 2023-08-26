import { BackupRequestCondition } from './dto/backup-request.condition';

export interface BackupRequestQueryRepository {
  count(condition: BackupRequestCondition): Promise<number>;
}

export const BackupRequestQueryRepository = Symbol('BackupRequestQueryRepository');
