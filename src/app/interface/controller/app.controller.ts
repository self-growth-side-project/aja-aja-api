import { Controller, Get, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { AppVersionResponse } from '../dto/response/app-version.response';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { BadRequestException } from '../../../global/exception/bad-request.exception';

@Controller()
export class AppController {
  @Version('1')
  @Get('/app-version')
  async getAppVersion(): Promise<BaseResponse<AppVersionResponse>> {
    const appOsType = GlobalContextUtil.getHeader().appOsType;

    if (!appOsType) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PARAMETER, { 'x-platform-type': appOsType });
    }

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
