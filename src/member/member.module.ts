import { Module } from '@nestjs/common';
import { MemberController } from './interfaces/controller/member.controller';
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

@Module({
  imports: [TypeOrmModule.forFeature([Member, BackupRequest])],
  controllers: [MemberController],
  providers: [
    MemberService,
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
  ],
  exports: [
    MemberService,
    {
      provide: MemberCommandRepository,
      useClass: TypeormMemberCommandRepository,
    },
    {
      provide: MemberQueryRepository,
      useClass: TypeormMemberQueryRepository,
    },
  ],
})
export class MemberModule {}
