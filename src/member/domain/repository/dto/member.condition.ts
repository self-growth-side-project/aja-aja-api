export class MemberCondition {
  email?: string | null;

  id?: number | null;

  private constructor(email: string | null, id: number | null) {
    this.email = email;
    this.id = id;
  }

  public static of(email: string | null, id: number | null): MemberCondition {
    return new MemberCondition(email, id);
  }
}
