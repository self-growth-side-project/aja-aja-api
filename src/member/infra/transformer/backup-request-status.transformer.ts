import { ValueTransformer } from 'typeorm';
import { BackupRequestStatus } from '../../domain/enum/backup-request-status.enum';

export class BackupRequestStatusTransformer implements ValueTransformer {
  to(entityValue: BackupRequestStatus): string | null {
    if (!entityValue) {
      return null;
    }

    return entityValue.enumName;
  }

  from(databaseValue: string): BackupRequestStatus | null {
    if (!databaseValue) {
      return null;
    }

    return BackupRequestStatus.valueByName(databaseValue);
  }
}
