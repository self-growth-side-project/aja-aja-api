import { Member } from '../../../src/member/domain/Member';
import { MockMemberCommandRepository } from '../../../src/member/infra/mock-member-command.repository';
import { MemberRole } from '../../../src/member/domain/MemberRole';

describe('MockMemberCommandRepository', () => {
  let member1: Member;
  let member2: Member;
  let repository: MockMemberCommandRepository;

  beforeEach(async () => {
    member1 = Member.of('a@a.com', '1234', MemberRole.MEMBER);
    member2 = Member.of('b@b.com', '1234', MemberRole.MEMBER);
    repository = new MockMemberCommandRepository();
  });

  afterEach(() => {
    repository.clear();
  });

  describe('save()', () => {
    it('회원 데이터가 DB 에 잘 저장되는지 확인', async () => {
      await repository.save(member1);

      expect(await repository.count()).toBe(1);
      expect(await repository.existByEmail(member1.email)).toBe(true);
    });

    it('회원 데이터 DB 에 저장 시 id 가 1씩 증가하는지 확인', async () => {
      member1 = await repository.save(member1);
      member2 = await repository.save(member2);

      expect(member1.id).toBe(1);
      expect(member2.id).toBe(2);
    });
  });

  describe('count()', () => {
    it('아무 데이터가 없는 경우 0이 반환되는지 확인', async () => {
      expect(await repository.count()).toBe(0);
    });

    it('존재하는 데이터의 수만큼 반환되는지 확인', async () => {
      await repository.save(member1);
      expect(await repository.count()).toBe(1);
    });
  });

  describe('existByEmail()', () => {
    it('이메일에 해당하는 회원이 DB 에 존재하는 경우 true 가 반환되는지 확인', async () => {
      await repository.save(member1);
      expect(await repository.existByEmail(member1.email)).toBe(true);
    });

    it('이메일에 해당하는 회원이 DB 에 존재하지 않는 경우 false 가 반환되는지 확인', async () => {
      await repository.save(member1);
      expect(await repository.existByEmail('ab@ab.com')).toBe(false);
    });
  });

  describe('clear()', () => {
    it('저장된 데이터가 모두 삭제되는지 확인', async () => {
      //given
      await repository.save(member1);
      await repository.save(member2);

      //when
      repository.clear();

      //then
      expect(await repository.count()).toBe(0);
    });
  });
});
