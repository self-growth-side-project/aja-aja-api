import { PagingResponse } from '../../../global/common/interface/dto/response/paging.response';
import { WithdrawnMemberResponse } from '../../interface/dto/response/withdrawn-member.response';
import { WithdrawnMemberCondition } from './dto/withdrawn-member.condition';

export interface WithdrawnMemberQueryRepository {
  findAll(
    condition: WithdrawnMemberCondition,
  ): Promise<WithdrawnMemberResponse[] | PagingResponse<WithdrawnMemberResponse> | []>;
}

export const WithdrawnMemberQueryRepository = Symbol('WithdrawnMemberQueryRepository');
