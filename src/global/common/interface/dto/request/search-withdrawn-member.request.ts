import { BaseRequest } from './base.request';
import { MemberCondition } from '../../../../../member/domain/repository/dto/member.condition';
import { WithdrawnMemberCondition } from '../../../../../member/domain/repository/dto/withdrawn-member.condition';

export class SearchWithdrawnMemberRequest extends BaseRequest {
  public toCondition(): WithdrawnMemberCondition {
    return MemberCondition.of(this.page, this.size, this.lastId, this.sort?.map(s => s.toCondition()));
  }
}
