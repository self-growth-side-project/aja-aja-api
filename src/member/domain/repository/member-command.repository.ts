import { Member } from '../Member';

export interface MemberCommandRepository {
  save(member: Member): Promise<Member>;

  count(): Promise<number>;

  existByEmail(email: string): Promise<boolean>;
}
