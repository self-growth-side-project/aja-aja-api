import { Exclude, Expose } from 'class-transformer';

export class CheckPendingBackupRequestResponse {
  @Exclude() private readonly _isExist: boolean;

  private constructor(isExist: boolean) {
    this._isExist = isExist;
  }

  public static from(isExist: boolean): CheckPendingBackupRequestResponse {
    return new CheckPendingBackupRequestResponse(isExist);
  }

  @Expose()
  get isExist(): boolean {
    return this._isExist;
  }
}
