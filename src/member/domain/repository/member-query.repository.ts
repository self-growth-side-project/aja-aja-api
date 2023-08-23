import { MemberCondition } from './dto/member.condition';
import { MemberResponse } from '../../interfaces/dto/member.response';

export interface MemberQueryRepository {
  find(condition: MemberCondition): Promise<MemberResponse | null>;
}

export const MemberQueryRepository = Symbol('MemberQueryRepository');
