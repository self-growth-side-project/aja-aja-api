import { Exclude, Expose } from 'class-transformer';
import { NumberUtil } from '../../../../global/util/number.util';
import { EnumResponse } from '../../../../global/common/interface/dto/response/enum.response';
import { MemberRole } from '../../../domain/enum/member-role.enum';
import { TimeUtil } from '../../../../global/util/time.util';
import { LocalDateTime } from '@js-joda/core';
import { FromLocalDateTime } from '../../../../global/common/decorator/transformer.decorator';

export class MemberResponse {
  @Exclude({ toPlainOnly: true }) private readonly _id: string;
  @Exclude({ toPlainOnly: true }) private readonly _email: string;
  @Exclude({ toPlainOnly: true }) public readonly _password: string;
  @Exclude({ toPlainOnly: true }) private readonly _role: string;
  @Exclude({ toPlainOnly: true }) private readonly _createdAt: Date;

  constructor(id: string, email: string, password: string, role: string, createdAt: Date) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
    this._createdAt = createdAt;
  }

  @Expose()
  get id(): number {
    return NumberUtil.parseInt(this._id) as number;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get role(): EnumResponse<MemberRole> | null {
    if (!this._role) {
      return null;
    }

    return EnumResponse.of(MemberRole.findCode(this._role));
  }

  @FromLocalDateTime()
  @Expose()
  get createdAt(): LocalDateTime {
    return TimeUtil.toLocalDateTime(this._createdAt) as LocalDateTime;
  }
}
