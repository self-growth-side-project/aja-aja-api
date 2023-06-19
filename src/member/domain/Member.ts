import { BaseTimeEntity } from '../../global/common/domain/BaseTimeEntity';
import { MemberRole } from './MemberRole';

export class Member extends BaseTimeEntity {
  private readonly email: string;

  private readonly _password: string;

  private readonly _role: MemberRole;

  private constructor(email: string, password: string, role: MemberRole) {
    super();
    this.email = email;
    this._password = password;
    this._role = role;
  }

  public static async signUpMember(email: string, password: string, encrypter: PasswordEncrypter): Promise<Member> {
    password = await encrypter.hash(password);
    return new Member(email, password, MemberRole.MEMBER);
  }

  public async isMatchPassword(password: string, encrypter: PasswordEncrypter): Promise<boolean> {
    return await encrypter.match(password, this._password);
  }

  get password(): string {
    return this._password;
  }

  get role(): MemberRole {
    return this._role;
  }
}
