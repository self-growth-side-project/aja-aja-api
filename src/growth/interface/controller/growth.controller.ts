import { Controller, Get, Query, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { SearchMonthGrowthRequest } from '../dto/request/search-month-growth.request';
import { SearchWeekGrowthRequest } from '../dto/request/search-week-growth.request';

@Controller('/growth')
export class GrowthController {
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/month')
  async getGrowthStatusByMonth(@Query() request: SearchMonthGrowthRequest): Promise<BaseResponse<Void>> {
    console.log(request);
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/week')
  async getGrowthStatusByWeek(@Query() request: SearchWeekGrowthRequest): Promise<BaseResponse<Void>> {
    console.log(request);
    return BaseResponse.voidBaseResponse();
  }
}
