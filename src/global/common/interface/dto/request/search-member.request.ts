import { PagingRequest } from './paging.request';
import { MemberCondition } from '../../../domain/repository/dto/member.condition';
import { MemberRole } from '../../../../../member/domain/enum/MemberRole';

export class SearchMemberRequest extends PagingRequest {
  public toCondition(): MemberCondition {
    return MemberCondition.of(this.page, this.size, null, null, MemberRole.MEMBER);
  }
}
