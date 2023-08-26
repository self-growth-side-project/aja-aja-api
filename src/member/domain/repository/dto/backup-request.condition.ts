import { BackupRequestStatus } from '../../enum/BackupRequestStatus';

export class BackupRequestCondition {
  memberId?: number | null;

  status?: string | null;

  private constructor(memberId: number | null, status: BackupRequestStatus | null) {
    this.memberId = memberId;
    this.status = status?.code;
  }

  public static of(memberId: number | null, status: BackupRequestStatus | null): BackupRequestCondition {
    return new BackupRequestCondition(memberId, status);
  }
}
