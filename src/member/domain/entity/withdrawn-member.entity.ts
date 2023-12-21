import { BaseTimeEntity } from '../../../global/common/domain/entity/base-time.entity';
import { MemberRole } from '../enum/member-role.enum';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { MemberRoleTransformer } from '../../infra/transformer/member-role.transformer';
import { BigintTransformer } from '../../../global/common/infra/transformer/bigint.transformer';
import { Member } from './member.entity';
import { MemberCommandRepository } from '../repository/member-command.repository';
import { LocalDateTimeTransformer } from '../../../global/common/infra/transformer/local-date-time.transformer';
import { LocalDateTime } from '@js-joda/core';

@Entity()
export class WithdrawnMember extends BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', unsigned: true, transformer: new BigintTransformer(), comment: '고유 식별 ID' })
  public readonly id: number;

  @Column({ type: 'bigint', unsigned: true, transformer: new BigintTransformer(), comment: '회원 식별 ID' })
  public readonly memberId: number;

  @Column({ type: 'varchar', length: 320, comment: '이메일' })
  public readonly email: string;

  @Column({ type: 'varchar', length: 10, transformer: new MemberRoleTransformer(), comment: '회원 Role' })
  public readonly role: MemberRole;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    precision: 3,
    comment: '가입 일시',
  })
  public readonly joinedAt: LocalDateTime;

  private constructor(memberId: number, email: string, role: MemberRole, joinedAt: LocalDateTime) {
    super();
    this.memberId = memberId;
    this.email = email;
    this.role = role;
    this.joinedAt = joinedAt;
  }
  public static of(memberId: number, email: string, role: MemberRole, joinedAt: LocalDateTime): WithdrawnMember {
    return new WithdrawnMember(memberId, email, role, joinedAt);
  }

  public static async withdrawFromMember(
    member: Member,
    repository: MemberCommandRepository,
  ): Promise<WithdrawnMember> {
    const withdrawnMember = WithdrawnMember.of(member.id, member.email, member.role, member.createdAt);

    await repository.remove(member);

    return withdrawnMember;
  }
}
