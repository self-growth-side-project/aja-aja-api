import { Body, Controller, Post, Version } from '@nestjs/common';
import { SignUpRequest } from '../dto/sign-up.request';
import { SignService } from '../../application/service/sign.service';
import { BaseResponse } from '../../../global/common/dto/base.response';

@Controller()
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Version('1')
  @Post('sign-up')
  async signUp(@Body() request: SignUpRequest): Promise<BaseResponse<Void>> {
    await this.signService.signUp(request.toServiceDto());
    return BaseResponse.voidBaseResponse();
  }
}
