import { Injectable } from '@nestjs/common';
import { EntityTarget } from 'typeorm';
import { BaseTypeormRepository } from '../../global/common/domain/infra/base-typeorm.repository';
import { RefreshToken } from '../domain/entity/refresh-token.entity';
import { RefreshTokenCommandRepository } from '../domain/repository/refresh-token-command.repository';

@Injectable()
export class TypeormRefreshTokenCommandRepository
  extends BaseTypeormRepository<RefreshToken>
  implements RefreshTokenCommandRepository
{
  getName(): EntityTarget<RefreshToken> {
    return RefreshToken.name;
  }

  async findOneByMemberId(memberId: number): Promise<RefreshToken | null> {
    return await this.getRepository().findOne({
      where: {
        'member.id': memberId,
      },
    } as any);
  }
}