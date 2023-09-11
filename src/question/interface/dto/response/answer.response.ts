import { Exclude, Expose } from 'class-transformer';
import { NumberUtil } from '../../../../global/util/number.util';
import { Answer } from '../../../domain/entity/answer.entity';

export class AnswerResponse {
  @Exclude({ toPlainOnly: true }) private readonly _id: string | number;
  @Exclude({ toPlainOnly: true }) private readonly _content: string;

  constructor(id: string | number, content: string) {
    this._id = id;
    this._content = content;
  }

  public static fromEntity(entity: Answer): AnswerResponse {
    return new AnswerResponse(entity.id, entity.content);
  }

  @Expose()
  get id(): number {
    if (typeof this._id === 'string') {
      return NumberUtil.parseInt(this._id) as number;
    }

    return this._id;
  }

  @Expose()
  get content(): string {
    return this._content;
  }
}
