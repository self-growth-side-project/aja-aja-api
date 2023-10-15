import { AppVersionResponse } from '../../interface/dto/response/app-version.response';
import { AppVersionCondition } from './dto/app-version.condition';

export interface AppVersionQueryRepository {
  find(condition: AppVersionCondition): Promise<AppVersionResponse | null>;
}

export const AppVersionQueryRepository = Symbol('AppVersionQueryRepository');
