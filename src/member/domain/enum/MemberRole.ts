import { Enum, EnumType } from 'ts-jenum';
import { BaseEnum } from '../../../global/common/domain/enum/base.enum';

@Enum('code')
export class MemberRole extends EnumType<MemberRole>() implements BaseEnum {
  static readonly ADMIN = new MemberRole('ADMIN', '관리자');
  static readonly MEMBER = new MemberRole('MEMBER', '회원');

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

  public static findCode(value: string): MemberRole | null {
    return this.values().find(role => role.code === value) ?? null;
  }
}
