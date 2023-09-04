import { Injectable } from '@nestjs/common';
import { Between, EntityTarget } from 'typeorm';
import { AuthCodeCommandRepository } from '../domain/repository/auth-code-command.repository';
import { AuthCode } from '../domain/entity/auth-code.entity';
import { AuthCodeType } from '../domain/enum/auth-code-type.enum';
import { TypeormBaseRepository } from '../../global/common/infra/repository/typeorm-base.repository';
import { Period } from '../../global/common/domain/vo/period.vo';

@Injectable()
export class TypeormAuthCodeCommandRepository
  extends TypeormBaseRepository<AuthCode>
  implements AuthCodeCommandRepository
{
  getName(): EntityTarget<AuthCode> {
    return AuthCode.name;
  }

  async findAllByMemberIdAndTypeAndCreatedAtToday(memberId: number, type: AuthCodeType): Promise<AuthCode[]> {
    const start = Period.createForTodayInKST().start;
    const end = Period.createForTodayInKST().end;

    return await this.getRepository().find({
      where: {
        'member.id': memberId,
        type: type,
        createdAt: Between(start, end),
      },
    } as any);
  }

  async findByCode(code: string): Promise<AuthCode | null> {
    return await this.getRepository().findOne({ where: { code: code } } as any);
  }

  async findAllByMemberId(memberId: number): Promise<AuthCode[]> {
    return await this.getRepository().find({ where: { 'member.id': memberId } } as any);
  }
}
