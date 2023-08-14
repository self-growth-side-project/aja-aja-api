import { Module } from '@nestjs/common';
import { MemberController } from './interfaces/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/entity/Member';
import { TypeormMemberCommandRepository } from './infra/typeorm-member-command.repository';
import { TypeormMemberQueryRepository } from './infra/typeorm-member-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: 'MemberCommandRepository',
      useClass: TypeormMemberCommandRepository,
    },
    {
      provide: 'MemberQueryRepository',
      useClass: TypeormMemberQueryRepository,
    },
  ],
  exports: [
    {
      provide: 'MemberCommandRepository',
      useClass: TypeormMemberCommandRepository,
    },
    {
      provide: 'MemberQueryRepository',
      useClass: TypeormMemberQueryRepository,
    },
  ],
})
export class MemberModule {}
