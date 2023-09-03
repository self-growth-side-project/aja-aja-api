import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class BackupRequestStatus extends EnumType<BackupRequestStatus>() {
  static readonly PENDING = new BackupRequestStatus('PENDING', '보류 중');
  static readonly COMPLETE = new BackupRequestStatus('COMPLETE', '완료');

  private constructor(
    readonly _code: string,
    readonly _name: string,
  ) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }
}
