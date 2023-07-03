import { BaseTimeEntity } from '../../global/common/domain/BaseTimeEntity';
import { MemberRole } from './MemberRole';

export class Member extends BaseTimeEntity {
  private readonly _id: number;

  private readonly _email: string;

  private readonly _password: string | null;

  private readonly _role: MemberRole;

  private constructor(email: string, password: string | null, role: MemberRole) {
    super();
    this._email = email;
    this._password = password;
    this._role = role;
  }

  public static async signUpMember(email: string, password: string, encrypter: PasswordEncrypter): Promise<Member> {
    const hashedPassword = await encrypter.hash(password);
    return new Member(email, hashedPassword, MemberRole.MEMBER);
  }

  public async isMatchPassword(password: string, encrypter: PasswordEncrypter): Promise<boolean> {
    return await encrypter.match(password, this._password);
  }

  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string | null {
    return this._password;
  }

  get role(): MemberRole {
    return this._role;
  }
}
