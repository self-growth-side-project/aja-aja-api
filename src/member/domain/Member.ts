import { BaseTimeEntity } from '../../global/common/domain/BaseTimeEntity';

export class Member extends BaseTimeEntity {
  private readonly email: string;

  private readonly _password: string;

  private constructor(email: string, password: string) {
    super();
    this.email = email;
    this._password = password;
  }

  public static async signUp(
    email: string,
    password: string,
    encrypter: PasswordEncrypter,
  ): Promise<Member> {
    password = await encrypter.hash(password);
    return new Member(email, password);
  }

  public async isMatchPassword(
    password: string,
    encrypter: PasswordEncrypter,
  ): Promise<boolean> {
    return await encrypter.match(password, this._password);
  }

  get password(): string {
    return this._password;
  }
}
