import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '../../global/common/domain/infra/base-typeorm.repository';
import { EntityTarget } from 'typeorm';
import { WithdrawnMember } from '../domain/entity/withdrawn-member.entity';
import { WithdrawnMemberCommandRepository } from '../domain/repository/withdrawn-member-command.repository';

@Injectable()
export class TypeormWithdrawnMemberCommandRepository
  extends BaseTypeormRepository<WithdrawnMember>
  implements WithdrawnMemberCommandRepository
{
  getName(): EntityTarget<WithdrawnMember> {
    return WithdrawnMember.name;
  }
}
