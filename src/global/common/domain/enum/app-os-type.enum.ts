import { Enum, EnumType } from 'ts-jenum';
import { BaseEnum } from './base.enum';
import { InternalServerException } from '../../../exception/internal-server.exception';

@Enum('code')
export class AppOsType extends EnumType<AppOsType>() implements BaseEnum {
  static readonly AOS = new AppOsType('AOS', 'AOS');
  static readonly IOS = new AppOsType('IOS', 'IOS');

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

  public static findCode(value: string): AppOsType {
    const code = this.values().find(role => role.code === value);

    if (!code) {
      throw new InternalServerException(InternalServerException.ErrorCodes.NOT_SUPPORTED_CODE, value);
    }

    return code;
  }
}
