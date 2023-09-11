export class CreateAnswerServiceDto {
  private readonly _questionId!: number;
  private readonly _content!: string;

  private constructor(questionId: number, content: string) {
    this._questionId = questionId;
    this._content = content;
  }

  public static of(questionId: number, content: string): CreateAnswerServiceDto {
    return new CreateAnswerServiceDto(questionId, content);
  }

  get questionId(): number {
    return this._questionId;
  }

  get content(): string {
    return this._content;
  }
}
