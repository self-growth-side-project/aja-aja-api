export class UpdateAnswerServiceDto {
  private readonly _questionId!: number;
  private readonly _answerId!: number;
  private readonly _content!: string;

  private constructor(questionId: number, answerId: number, content: string) {
    this._questionId = questionId;
    this._answerId = answerId;
    this._content = content;
  }

  public static of(questionId: number, answerId: number, content: string): UpdateAnswerServiceDto {
    return new UpdateAnswerServiceDto(questionId, answerId, content);
  }

  get questionId(): number {
    return this._questionId;
  }

  get answerId(): number {
    return this._answerId;
  }

  get content(): string {
    return this._content;
  }
}
