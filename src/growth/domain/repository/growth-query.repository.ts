import { GrowthCondition } from './dto/growth.condition';
import { GrowthMonthResponse } from '../../interface/dto/response/growth-month.response';
import { GrowthWeekResponse } from '../../interface/dto/response/growth-week.response';

export interface GrowthQueryRepository {
  getGrowthStatusByMonth(condition: GrowthCondition): Promise<GrowthMonthResponse[]>;
  getGrowthStatusByWeek(condition: GrowthCondition): Promise<GrowthWeekResponse[]>;
}

export const GrowthQueryRepository = Symbol('GrowthQueryRepository');
