import { Controller, Get, Query, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { CheckEmailDuplicationRequest } from '../dto/check-login-id.request';
import { MemberService } from '../../application/service/member.service';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Version('1')
  @Get('/members/email/duplication')
  async checkEmailDuplication(@Query() request: CheckEmailDuplicationRequest): Promise<BaseResponse<boolean>> {
    return BaseResponse.successBaseResponse(await this.memberService.checkEmailDuplication(request.toServiceDto()));
  }
}
