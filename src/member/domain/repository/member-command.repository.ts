import { Member } from '../Member';

export interface MemberCommandRepository {
  save(member: Member): Promise<Member>;

  existByEmail(email: string): Promise<boolean>;
}
