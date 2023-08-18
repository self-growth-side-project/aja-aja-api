import { Body, Controller, Post, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/dto/base.response';
import { SendCodeResetPasswordRequest } from '../dto/request/send-code-reset-password.request';
import { AuthService } from '../../application/service/auth.service';
import { VerifyCodeResetPasswordRequest } from '../dto/request/verify-code-reset-password.request';
import { VerifyCodeResetPasswordResponse } from '../dto/response/verify-code-reset-password.response';

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
  async verifyAuthCodeByResetPassword(
    @Body() request: VerifyCodeResetPasswordRequest,
  ): Promise<BaseResponse<VerifyCodeResetPasswordResponse>> {
    return BaseResponse.successBaseResponse(
      VerifyCodeResetPasswordResponse.fromEntity(
        await this.authService.verifyAuthCodeByResetPassword(request.toServiceDto()),
      ),
    );
  }
}
