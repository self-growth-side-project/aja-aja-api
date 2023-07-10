import { MemberCommandRepository } from '../domain/repository/member-command.repository';
import { Member } from '../domain/Member';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockMemberCommandRepository implements MemberCommandRepository {
  private static readonly membersPool: Map<number, Member> = new Map();
  private static lastId = 0;
  async save(member: Member): Promise<Member> {
    const id = ++MockMemberCommandRepository.lastId;
    MockMemberCommandRepository.membersPool.set(id, member);
    return Member.of(member.email, member.password, member.role, id);
  }

  async count(): Promise<number> {
    return MockMemberCommandRepository.membersPool.size;
  }

  async existByEmail(email: string): Promise<boolean> {
    return Array.from(MockMemberCommandRepository.membersPool.values()).some(member => member.email === email);
  }

  public clear(): void {
    MockMemberCommandRepository.membersPool.clear();
    MockMemberCommandRepository.lastId = 0;
  }
}
