import { GrowthCondition } from './dto/growth.condition';
import { GrowthMonthResponse } from '../../interface/dto/response/growth-month.response';

export interface GrowthQueryRepository {
  getGrowthStatusByMonth(condition: GrowthCondition): Promise<GrowthMonthResponse[]>;
}

export const GrowthQueryRepository = Symbol('GrowthQueryRepository');
