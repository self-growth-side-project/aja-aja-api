import { Controller, Get, Query, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { MemberService } from '../../application/service/member.service';
import { CheckEmailDuplicationRequest } from '../dto/check-email-duplication.request';
import { CheckEmailDuplicationResponse } from '../dto/check-email-duplication.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/members/me')
  async getMe(): Promise<BaseResponse<Void>> {
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @Get('/members/email/duplication')
  async checkEmailDuplication(
    @Query() request: CheckEmailDuplicationRequest,
  ): Promise<BaseResponse<CheckEmailDuplicationResponse>> {
    return BaseResponse.successBaseResponse(
      CheckEmailDuplicationResponse.from(await this.memberService.checkEmailDuplication(request.toServiceDto())),
    );
  }
}
