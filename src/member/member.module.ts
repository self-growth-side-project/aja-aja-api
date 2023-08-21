import { Module } from '@nestjs/common';
import { MemberController } from './interfaces/controller/member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/entity/member.entity';
import { TypeormMemberQueryRepository } from './infra/typeorm-member-query.repository';
import { MemberQueryRepository } from './domain/repository/member-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [
    {
      provide: MemberQueryRepository,
      useClass: TypeormMemberQueryRepository,
    },
  ],
  exports: [
    {
      provide: MemberQueryRepository,
      useClass: TypeormMemberQueryRepository,
    },
  ],
})
export class MemberModule {}
