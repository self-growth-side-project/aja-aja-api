import { BaseTimeEntity } from './BaseTimeEntity';

export class Member extends BaseTimeEntity {
  private readonly email: string;

  private readonly password: string;

  private constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  static signUp(email: string, password: string): Member {
    return new Member(email, password);
  }
}
