export class CheckLoginIdServiceDto {
  private readonly _loginId!: string;

  private constructor(loginId: string) {
    this._loginId = loginId;
  }

  public static of(loginId: string): CheckLoginIdServiceDto {
    return new CheckLoginIdServiceDto(loginId);
  }

  get loginId(): string {
    return this._loginId;
  }
}
