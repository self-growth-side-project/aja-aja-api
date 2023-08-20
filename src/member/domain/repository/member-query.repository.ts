import { MemberServiceDto } from '../../application/dto/member.service.dto';
import { MemberCondition } from './dto/member.condition';

export interface MemberQueryRepository {
  find(condition: MemberCondition): Promise<MemberServiceDto | null>;
}

export const MemberQueryRepository = Symbol('MemberQueryRepository');
