import { Member } from '../../../src/member/domain/Member';

describe('Member', () => {
  it('signUp() 호출 시 회원 객체가 정상적으로 생성되는지 확인', () => {
    const member = Member.signUp('developerkgh@gmail.com', 'a1234567!');
    expect(member).toBeInstanceOf(Member);
  });
});
