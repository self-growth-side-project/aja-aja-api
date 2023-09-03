import { Inject, Injectable } from '@nestjs/common';
import { MemberCommandRepository } from '../../domain/repository/member-command.repository';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { BackupRequestCommandRepository } from '../../domain/repository/backup-request-command.repository';
import { BackupRequestStatus } from '../../domain/enum/backup-request-status.enum';
import { ConflictException } from '../../../global/exception/conflict.exception';
import { Propagation, Transactional } from '../../../global/common/decorator/transactional.decorator';
import { BackupRequest } from '../../domain/entity/backup-request.entity';

@Injectable()
export class BackupService {
  constructor(
    @Inject(MemberCommandRepository)
    private readonly memberCommandRepository: MemberCommandRepository,

    @Inject(BackupRequestCommandRepository)
    private readonly backupRequestCommandRepository: BackupRequestCommandRepository,
  ) {}

  @Transactional()
  async requestToBackup(): Promise<void> {
    const memberId = GlobalContextUtil.getMember().id;

    const foundMember = await this.memberCommandRepository.findById(memberId);

    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    const isExist = await this.backupRequestCommandRepository.existByMemberIdAndStatus(
      memberId,
      BackupRequestStatus.PENDING,
    );

    if (isExist) {
      throw new ConflictException(ConflictException.ErrorCodes.DUPLICATE_BACKUP_PENDING_REQUEST);
    }

    const backupRequest = BackupRequest.createPendingRequest(foundMember);

    await this.backupRequestCommandRepository.save(backupRequest);
  }

  @Transactional({ propagation: Propagation.REQUIRES_NEW })
  async removeBackupRequests(memberId: number): Promise<void> {
    const foundBackupRequests = await this.backupRequestCommandRepository.findAllByMemberId(memberId);

    if (foundBackupRequests) {
      await this.backupRequestCommandRepository.removeAll(foundBackupRequests);
    }
  }
}
