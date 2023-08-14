import { Member } from '../entity/Member';

export interface MemberCommandRepository {
  save(member: Member): Promise<Member>;

  count(): Promise<number>;

  existByEmail(email: string): Promise<boolean>;

  findByEmail(email: string): Promise<Member | null>;
}
