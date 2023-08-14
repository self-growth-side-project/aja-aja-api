import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class AuthCodeType extends EnumType<AuthCodeType>() {
  static readonly RESET_PASSWORD_EMAIL_AUTH_CODE = new AuthCodeType('RESET_PASSWORD_EMAIL_AUTH_CODE');
  static readonly RESET_PASSWORD_VERIFIED_AUTH_CODE = new AuthCodeType('RESET_PASSWORD_VERIFIED_AUTH_CODE');

  private constructor(readonly _code: string) {
    super();
  }

  get code(): string {
    return this._code;
  }
}
