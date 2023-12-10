import { Exclude, Expose } from 'class-transformer';
import { Question } from '../../../domain/entity/question.entity';

export class WiseManOpinionResponse {
  @Exclude({ toPlainOnly: true }) private readonly _questionId: number;
  @Exclude({ toPlainOnly: true }) public readonly _wiseManOpinion: string;
  @Exclude({ toPlainOnly: true }) public readonly _wiseManName: string;

  private constructor(questionId: number, wiseManOpinion: string, wiseManName: string) {
    this._questionId = questionId;
    this._wiseManOpinion = wiseManOpinion;
    this._wiseManName = wiseManName;
  }

  @Expose()
  get questionId(): number {
    return this._questionId;
  }

  @Expose()
  get wiseManOpinion(): string {
    return this._wiseManOpinion;
  }

  @Expose()
  get wiseManName(): string {
    return this._wiseManName;
  }

  public static fromQuestionEntity(question: Question): WiseManOpinionResponse {
    return new WiseManOpinionResponse(question.id, question.wiseManOpinion, question.wiseManName);
  }
}
