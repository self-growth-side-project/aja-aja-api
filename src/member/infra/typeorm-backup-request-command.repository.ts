import { Injectable } from '@nestjs/common';
import { TypeormBaseRepository } from '../../global/common/infra/repository/typeorm-base.repository';
import { EntityTarget } from 'typeorm';
import { BackupRequest } from '../domain/entity/backup-request.entity';
import { BackupRequestCommandRepository } from '../domain/repository/backup-request-command.repository';
import { BackupRequestStatus } from '../domain/enum/backup-request-status.enum';

@Injectable()
export class TypeormBackupRequestCommandRepository
  extends TypeormBaseRepository<BackupRequest>
  implements BackupRequestCommandRepository
{
  getName(): EntityTarget<BackupRequest> {
    return BackupRequest.name;
  }

  async existByMemberIdAndStatus(memberId: number, status: BackupRequestStatus): Promise<boolean> {
    return await this.getRepository().exist({ where: { 'member.id': memberId, status: status } as any });
  }

  async findAllByMemberId(memberId: number): Promise<BackupRequest[]> {
    return await this.getRepository().find({ where: { 'member.id': memberId } } as any);
  }
}
