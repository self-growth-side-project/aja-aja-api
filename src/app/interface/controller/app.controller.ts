import { Controller, Get, Inject, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { AppVersionResponse } from '../dto/response/app-version.response';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { BadRequestException } from '../../../global/exception/bad-request.exception';
import { AppVersionQueryRepository } from '../../domain/repository/app-version-query.repository';
import { AppVersionCondition } from '../../domain/repository/dto/app-version.condition';

@Controller()
export class AppController {
  constructor(
    @Inject(AppVersionQueryRepository)
    private readonly appVersionQueryRepository: AppVersionQueryRepository,
  ) {}

  @Version('1')
  @Get('/app-version')
  async getAppVersion(): Promise<BaseResponse<AppVersionResponse | null>> {
    const appOsType = GlobalContextUtil.getHeader().appOsType;

    if (!appOsType) {
      throw new BadRequestException(BadRequestException.ErrorCodes.INVALID_PARAMETER, { 'x-platform-type': appOsType });
    }

    const result = await this.appVersionQueryRepository.find(AppVersionCondition.of(appOsType));

    return BaseResponse.successBaseResponse(result);
  }
}
