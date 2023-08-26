import { Controller, Get, Version } from '@nestjs/common';
import { BaseResponse } from './global/common/dto/response/base.response';

@Controller()
export class AppController {
  @Version('1')
  @Get()
  checkHealth(): BaseResponse<string> {
    return BaseResponse.successBaseResponse('AJA-AJA API SERVER IS RUNNING...');
  }
}
