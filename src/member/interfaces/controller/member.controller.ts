import { Body, Controller, Get, Inject, Patch, Post, Query, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { MemberService } from '../../application/service/member.service';
import { CheckEmailDuplicationRequest } from '../dto/check-email-duplication.request';
import { CheckEmailDuplicationResponse } from '../dto/check-email-duplication.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { MemberQueryRepository } from '../../domain/repository/member-query.repository';
import { MemberResponse } from '../dto/member.response';
import { MemberCondition } from '../../domain/repository/dto/member.condition';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { ResetMyPasswordRequest } from '../dto/reset-my-password.request';

@Controller('/members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    @Inject(MemberQueryRepository)
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(): Promise<BaseResponse<MemberResponse>> {
    const result = await this.memberQueryRepository.find(MemberCondition.of(null, GlobalContextUtil.getMember().id));

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
    return BaseResponse.voidBaseResponse();
  }
}
