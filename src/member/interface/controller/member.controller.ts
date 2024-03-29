import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { MemberService } from '../../application/service/member.service';
import { CheckEmailDuplicationRequest } from '../dto/request/check-email-duplication.request';
import { CheckEmailDuplicationResponse } from '../dto/response/check-email-duplication.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { MemberQueryRepository } from '../../domain/repository/member-query.repository';
import { MemberResponse } from '../dto/response/member.response';
import { MemberCondition } from '../../domain/repository/dto/member.condition';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { ResetMyPasswordRequest } from '../dto/request/reset-my-password.request';
import { BackupRequestQueryRepository } from '../../domain/repository/backup-request-query.repository';
import { BackupRequestCondition } from '../../domain/repository/dto/backup-request.condition';
import { BackupRequestStatus } from '../../domain/enum/backup-request-status.enum';
import { CheckPendingBackupRequestResponse } from '../dto/response/check-pending-backup-request.response';
import { BackupService } from '../../application/service/backup.service';

@Controller('/members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,

    private readonly backupService: BackupService,

    @Inject(MemberQueryRepository)
    private readonly memberQueryRepository: MemberQueryRepository,

    @Inject(BackupRequestQueryRepository)
    private readonly backupRequestQueryRepository: BackupRequestQueryRepository,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(): Promise<BaseResponse<MemberResponse>> {
    const result = await this.memberQueryRepository.find(
      MemberCondition.of(null, null, null, null, null, GlobalContextUtil.getMember().id),
    );

    if (!result) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    return BaseResponse.successBaseResponse(result);
  }

  @Version('1')
  @Get('/email/duplication')
  async checkEmailDuplication(
    @Query() request: CheckEmailDuplicationRequest,
  ): Promise<BaseResponse<CheckEmailDuplicationResponse>> {
    return BaseResponse.successBaseResponse(
      CheckEmailDuplicationResponse.from(await this.memberService.checkEmailDuplication(request.toServiceDto())),
    );
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Patch('/me/password')
  async resetMyPassword(@Body() request: ResetMyPasswordRequest): Promise<BaseResponse<Void>> {
    await this.memberService.resetMyPassword(request.toServiceDto());
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('/me/backups')
  async requestToBackup(): Promise<BaseResponse<Void>> {
    await this.backupService.requestToBackup();
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/me/backups/pending')
  async checkPendingBackup(): Promise<BaseResponse<CheckPendingBackupRequestResponse>> {
    const count = await this.backupRequestQueryRepository.count(
      BackupRequestCondition.of(GlobalContextUtil.getMember().id, BackupRequestStatus.PENDING),
    );

    return BaseResponse.successBaseResponse(CheckPendingBackupRequestResponse.from(count > 0));
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async withdraw(): Promise<BaseResponse<Void>> {
    await this.memberService.withdraw();
    return BaseResponse.voidBaseResponse();
  }
}
