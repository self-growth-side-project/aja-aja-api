import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class MemberRole extends EnumType<MemberRole>() {
  static readonly ADMIN = new MemberRole('ADMIN', '관리자');
  static readonly MEMBER = new MemberRole('MEMBER', '회원');

  private constructor(readonly _code: string, readonly _name: string) {
    super();
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }
}
