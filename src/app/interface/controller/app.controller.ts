import { Controller, Get, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { AppVersionResponse } from '../dto/response/app-version.response';

@Controller()
export class AppController {
  @Version('1')
  @Get('/app-version')
  async getAppVersion(): Promise<BaseResponse<AppVersionResponse>> {
    const response = new AppVersionResponse(
      '1.0.0',
      '1.0.0',
      '권장 제목',
      '권장 본문',
      '0.0.1',
      '강제 제목',
      '강제 본문',
    );

    return BaseResponse.successBaseResponse(response);
  }
}
