import { Exclude, Expose } from 'class-transformer';
import { Duration, LocalDate, LocalDateTime } from '@js-joda/core';
import { TimeUtil } from '../../../../global/util/time.util';
import { FromLocalDate } from '../../../../global/common/decorator/transformer.decorator';
import { Question } from '../../../domain/entity/question.entity';
import { Answer } from '../../../domain/entity/answer.entity';

export class QuestionResponse {
  @Exclude({ toPlainOnly: true }) private readonly _id: number;
  @Exclude({ toPlainOnly: true }) private readonly _title: string;
  @Exclude({ toPlainOnly: true }) public readonly _content: string;
  @Exclude({ toPlainOnly: true }) public readonly _answer: Answer | undefined;

  private constructor(id: number, title: string, content: string);

  private constructor(id: number, title: string, content: string, answer?: Answer);

  private constructor(id: number, title: string, content: string, answer?: Answer) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._answer = answer;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get title(): string {
    return this._title;
  }

  @Expose()
  get content(): string {
    return this._content;
  }

  @Expose()
  @FromLocalDate()
  get today(): LocalDate {
    return TimeUtil.getLocalDateInKST();
  }

  @Expose()
  get isWiseManOpinionOpen(): boolean {
    if (!this._answer || !this._answer.createdAt) {
      return false;
    }
    const duration = Duration.between(this._answer.createdAt, LocalDateTime.now());

    return duration.toMinutes() >= 30;
  }

  @Expose()
  get isAnswered(): boolean {
    return !!this._answer;
  }

  public static fromQuestionEntity(question: Question | null): QuestionResponse | null {
    if (!question) {
      return null;
    }

    return new QuestionResponse(question.id, question.title, question.content);
  }

  public static fromAnswerEntity(answer: Answer | null): QuestionResponse | null {
    if (!answer) {
      return null;
    }

    return new QuestionResponse(answer.question.id, answer.question.title, answer.question.content, answer);
  }
}
