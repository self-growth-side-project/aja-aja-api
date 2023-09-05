import { Column, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { Member } from '../../../member/domain/entity/member.entity';
import { Question } from './question.entity';
import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { Period } from '../../../global/common/domain/vo/period.vo';
import { TimeUtil } from '../../../global/util/time.util';
import { LocalDateTimeTransformer } from '../../../global/common/infra/transformer/local-date-time.transformer';
import { LocalDateTime } from '@js-joda/core';

@Unique('UK_question_id_member_id', ['question.id', 'member.id'])
@Entity()
export class Answer extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer() })
  public readonly id: number;

  @Column({ type: 'text' })
  public readonly content: string;

  @ManyToOne(() => Question, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'question_id' })
  public readonly question: Question;

  @ManyToOne(() => Member, { lazy: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'member_id' })
  public readonly member: Member;

  @DeleteDateColumn({ type: 'timestamp', transformer: new LocalDateTimeTransformer(), nullable: true, precision: 0 })
  public readonly deletedAt!: LocalDateTime | null;

  public isWrittenOnToday(): boolean {
    return Period.createForTodayInKST().isWithinRange(this.createdAt);
  }

  public isOvernight(): boolean {
    const now = TimeUtil.getLocalDateTimeInKST();
    const createdAt = TimeUtil.convertLocalDateTimeToKST(this.createdAt);
    const nextDate = createdAt.withHour(0).withMinute(0).withSecond(0).withNano(0).plusDays(1);

    return now.isAfter(nextDate) || now.isEqual(nextDate);
  }
}
