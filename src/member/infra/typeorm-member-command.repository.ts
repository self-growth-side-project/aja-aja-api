import { MemberCommandRepository } from '../domain/repository/member-command.repository';
import { Member } from '../domain/entity/member.entity';
import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '../../global/common/infra/repository/base-typeorm.repository';
import { EntityTarget } from 'typeorm';

@Injectable()
export class TypeormMemberCommandRepository extends BaseTypeormRepository<Member> implements MemberCommandRepository {
  getName(): EntityTarget<Member> {
    return Member.name;
  }

  async existByEmail(email: string): Promise<boolean> {
    return await this.getRepository().exist({ where: { email: email } });
  }

  async findByEmail(email: string): Promise<Member | null> {
    return await this.getRepository().findOne({ where: { email: email } });
  }
}
