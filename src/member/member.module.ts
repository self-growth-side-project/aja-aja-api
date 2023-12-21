import { Module } from '@nestjs/common';
import { MemberController } from './interface/controller/member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/entity/member.entity';
import { TypeormMemberQueryRepository } from './infra/typeorm-member-query.repository';
import { MemberQueryRepository } from './domain/repository/member-query.repository';
import { BackupRequest } from './domain/entity/backup-request.entity';
import { MemberService } from './application/service/member.service';
import { MemberCommandRepository } from './domain/repository/member-command.repository';
import { TypeormMemberCommandRepository } from './infra/typeorm-member-command.repository';
import { BackupRequestCommandRepository } from './domain/repository/backup-request-command.repository';
import { TypeormBackupRequestCommandRepository } from './infra/typeorm-backup-request-command.repository';
import { BackupRequestQueryRepository } from './domain/repository/backup-request-query.repository';
import { TypeormBackupRequestQueryRepository } from './infra/typeorm-backup-request-query.repository';
import { WithdrawnMemberCommandRepository } from './domain/repository/withdrawn-member-command.repository';
import { TypeormWithdrawnMemberCommandRepository } from './infra/typeorm-withdrawn-member-command.repository';
import { BackupService } from './application/service/backup.service';
import { WithdrawnMemberQueryRepository } from './domain/repository/withdrawn-member-query.repository';
import { TypeormWithdrawnMemberQueryRepository } from './infra/typeorm-withdrawn-member-query.repository';
import { WithdrawnMember } from './domain/entity/withdrawn-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, BackupRequest, WithdrawnMember])],
  controllers: [MemberController],
  providers: [
    MemberService,
    BackupService,
    {
      provide: MemberCommandRepository,
      useClass: TypeormMemberCommandRepository,
    },
    {
      provide: MemberQueryRepository,
      useClass: TypeormMemberQueryRepository,
    },
    {
      provide: BackupRequestCommandRepository,
      useClass: TypeormBackupRequestCommandRepository,
    },
    {
      provide: BackupRequestQueryRepository,
      useClass: TypeormBackupRequestQueryRepository,
    },
    {
      provide: WithdrawnMemberCommandRepository,
      useClass: TypeormWithdrawnMemberCommandRepository,
    },
    {
      provide: WithdrawnMemberQueryRepository,
      useClass: TypeormWithdrawnMemberQueryRepository,
    },
  ],
  exports: [
    MemberService,
    BackupService,
    {
      provide: MemberCommandRepository,
      useClass: TypeormMemberCommandRepository,
    },
    {
      provide: MemberQueryRepository,
      useClass: TypeormMemberQueryRepository,
    },
    {
      provide: WithdrawnMemberQueryRepository,
      useClass: TypeormWithdrawnMemberQueryRepository,
    },
  ],
})
export class MemberModule {}
