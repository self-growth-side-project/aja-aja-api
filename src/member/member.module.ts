import { Module } from '@nestjs/common';
import { MemberController } from './interfaces/controller/member.controller';
import { MemberService } from './application/service/member.service';
import { MockMemberCommandRepository } from './infra/mock-member-command.repository';

@Module({
  imports: [],
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: 'MockMemberCommandRepository',
      useClass: MockMemberCommandRepository,
    },
  ],
  exports: [
    {
      provide: 'MockMemberCommandRepository',
      useClass: MockMemberCommandRepository,
    },
  ],
})
export class MemberModule {}
