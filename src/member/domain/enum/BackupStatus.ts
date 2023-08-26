import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class BackupStatus extends EnumType<BackupStatus>() {
  static readonly PENDING = new BackupStatus('PENDING', '보류 중');
  static readonly COMPLETE = new BackupStatus('COMPLETE', '완료');

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
