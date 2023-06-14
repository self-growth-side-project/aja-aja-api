export class Member {
  private readonly email: string;

  private readonly password: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static signUp(email: string, password: string): Member {
    return new Member(email, password);
  }
}
