import { MemberRole } from '../../member/domain/enum/MemberRole';

export class MemberPayload {
  id: number;

  email: string;

  role: MemberRole;

  private constructor(id: number, email: string, role: string) {
    this.id = id;
    this.email = email;
    this.role = MemberRole.findCode(role);
  }

  public static from(payload: any): MemberPayload {
    return new MemberPayload(payload.memberId, payload.email, payload.role);
  }
}
