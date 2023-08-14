export class MemberCondition {
  email?: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static of(email: string): MemberCondition {
    return new MemberCondition(email);
  }
}
