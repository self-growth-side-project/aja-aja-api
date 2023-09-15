import { Controller, Get, Inject, Query, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { SearchMonthGrowthRequest } from '../dto/request/search-month-growth.request';
import { SearchWeekGrowthRequest } from '../dto/request/search-week-growth.request';
import { GrowthQueryRepository } from '../../domain/repository/growth-query.repository';
import { GrowthMonthResponse } from '../dto/response/growth-month.response';
import { GrowthWeekResponse } from '../dto/response/growth-week.response';

@Controller('/growth')
export class GrowthController {
  constructor(
    @Inject(GrowthQueryRepository)
    private readonly growthQueryRepository: GrowthQueryRepository,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/month')
  async getGrowthStatusByMonth(
    @Query() request: SearchMonthGrowthRequest,
  ): Promise<BaseResponse<GrowthMonthResponse[]>> {
    return BaseResponse.successBaseResponse(
      await this.growthQueryRepository.getGrowthStatusByMonth(request.toCondition()),
    );
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/week')
  async getGrowthStatusByWeek(@Query() request: SearchWeekGrowthRequest): Promise<BaseResponse<GrowthWeekResponse[]>> {
    return BaseResponse.successBaseResponse(
      await this.growthQueryRepository.getGrowthStatusByWeek(request.toCondition()),
    );
  }
}
