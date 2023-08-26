import { ValueTransformer } from 'typeorm';
import { BackupStatus } from '../../domain/enum/BackupStatus';

export class BackupStatusTransformer implements ValueTransformer {
  to(entityValue: BackupStatus): string | null {
    if (!entityValue) {
      return null;
    }

    return entityValue.enumName;
  }

  from(databaseValue: string): BackupStatus | null {
    if (!databaseValue) {
      return null;
    }

    return BackupStatus.valueByName(databaseValue);
  }
}
