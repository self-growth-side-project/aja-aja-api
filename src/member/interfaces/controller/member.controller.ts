import { Controller, Get, Query, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { MemberService } from '../../application/service/member.service';
import { CheckEmailDuplicationRequest } from '../dto/check-email-duplication.request';
import { CheckEmailDuplicationResponse } from '../dto/check-email-duplication.response';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

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
