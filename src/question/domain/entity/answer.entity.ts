import { Column, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { Member } from '../../../member/domain/entity/member.entity';
import { Question } from './question.entity';
import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { Period } from '../../../global/common/domain/vo/period.vo';
import { TimeUtil } from '../../../global/util/time.util';
import { LocalDateTimeTransformer } from '../../../global/common/infra/transformer/local-date-time.transformer';
import { Duration, LocalDateTime } from '@js-joda/core';
import { UpdateAnswerServiceDto } from '../../application/dto/update-answer.service.dto';

@Unique('UK_question_id_member_id', ['question.id', 'member.id'])
@Entity()
export class Answer extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer(), comment: '고유 식별 ID' })
  public readonly id: number;

  @Column({ type: 'text', comment: '나만의 생각 내용' })
  public content: string;

  @ManyToOne(() => Question, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'question_id' })
  public readonly question: Question;

  @ManyToOne(() => Member, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  public readonly member: Member;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
    precision: 0,
    comment: '삭제 일시',
  })
  public readonly deletedAt!: LocalDateTime | null;

  private constructor(content: string, question: Question, member: Member) {
    super();
    this.content = content;
    this.question = question;
    this.member = member;
  }

  public static create(content: string, question: Question, member: Member): Answer {
    return new Answer(content, question, member);
  }

  public isWrittenOnToday(): boolean {
    return Period.createForTodayInKST().isWithinRange(this.createdAt);
  }

  public isOvernight(): boolean {
    const now = TimeUtil.getLocalDateTimeInKST();
    const createdAt = TimeUtil.convertLocalDateTimeToKST(this.createdAt);
    const nextDate = createdAt.withHour(0).withMinute(0).withSecond(0).withNano(0).plusDays(1);

    return now.isAfter(nextDate) || now.isEqual(nextDate);
  }

  public canAccessWiseManOpinion(): boolean {
    return Duration.between(this.createdAt, LocalDateTime.now()).toMinutes() >= 30;
  }

  public update(dto: UpdateAnswerServiceDto) {
    this.content = dto.content;
  }
}
