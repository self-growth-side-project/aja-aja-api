import { Member } from '../entity/member.entity';

export interface MemberCommandRepository {
  save(member: Member): Promise<Member>;

  count(): Promise<number>;

  existByEmail(email: string): Promise<boolean>;

  findByEmail(email: string): Promise<Member | null>;
}

export const MemberCommandRepository = Symbol('MemberCommandRepository');
