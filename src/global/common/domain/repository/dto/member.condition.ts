import { PagingCondition } from './paging.condition';
import { MemberRole } from '../../../../../member/domain/enum/MemberRole';

export class MemberCondition extends PagingCondition {
  email?: string | null | undefined;

  id?: number | null | undefined;

  role?: string | null | undefined;

  private constructor(
    page?: number | null | undefined,
    size?: number | null | undefined,
    email?: string | null | undefined,
    id?: number | null | undefined,
    role?: MemberRole | null | undefined,
  ) {
    super(page, size);
    this.email = email;
    this.id = id;
    this.role = role?.code;
  }

  public static of(
    page?: number | null | undefined,
    size?: number | null | undefined,
    email?: string | null,
    id?: number | null,
    role?: MemberRole | null | undefined,
  ): MemberCondition {
    return new MemberCondition(page, size, email, id, role);
  }
}
