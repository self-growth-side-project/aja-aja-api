import { Exclude, Expose } from 'class-transformer';
import { NumberUtil } from '../../../../global/util/number.util';

export class AnswerResponse {
  @Exclude({ toPlainOnly: true }) private readonly _id: string;
  @Exclude({ toPlainOnly: true }) private readonly _content: string;

  constructor(id: string, content: string) {
    this._id = id;
    this._content = content;
  }

  @Expose()
  get id(): number {
    return NumberUtil.parseInt(this._id) as number;
  }

  @Expose()
  get content(): string {
    return this._content;
  }
}
