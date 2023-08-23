import { Exclude, Expose } from 'class-transformer';

export class MemberResponse {
  @Exclude({ toPlainOnly: true }) private readonly _id: number;
  @Exclude({ toPlainOnly: true }) private readonly _email: string;
  @Exclude({ toPlainOnly: true }) public readonly _password: string;
  @Exclude({ toPlainOnly: true }) private readonly _role: string;

  constructor(id: number, email: string, password: string, role: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._role = role;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get role(): string {
    return this._role;
  }
}
