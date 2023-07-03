import { MemberCommandRepository } from '../domain/repository/member-command.repository';
import { Member } from '../domain/Member';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockMemberCommandRepository implements MemberCommandRepository {
  private static readonly membersPool: Map<number, Member> = new Map();
  private static lastId = 0;

  async existByEmail(email: string): Promise<boolean> {
    return Array.from(MockMemberCommandRepository.membersPool.values()).some(member => member.email === email);
  }

  async save(member: Member): Promise<Member> {
    const id = MockMemberCommandRepository.lastId++;
    MockMemberCommandRepository.membersPool.set(id, member);
    return member;
  }
}
