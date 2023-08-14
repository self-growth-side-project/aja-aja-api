import { Body, Controller, Post, Version } from '@nestjs/common';
import { SignUpRequest } from '../dto/request/sign-up.request';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { SendCodeResetPasswordRequest } from '../dto/request/send-code-reset-password.request';
import { AuthService } from '../../application/service/auth.service';

@Controller('/auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('/codes/reset-password')
  async sendCodeToResetPassword(@Body() request: SendCodeResetPasswordRequest): Promise<BaseResponse<Void>> {
    await this.authService.sendCodeToResetPassword(request.toServiceDto());
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @Post('/codes/reset-password/verifications')
  async verifyAuthCodeByResetPassword(@Body() request: SignUpRequest): Promise<BaseResponse<Void>> {
    console.log(request);
    return BaseResponse.voidBaseResponse();
  }
}
