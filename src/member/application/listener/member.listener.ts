import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MemberListener {
  public static readonly WITHDRAW_MEMBER = 'member.withdraw';

  //constructor(private readonly updateLastLoginService: UpdateLastLoginService) {}

  @OnEvent(MemberListener.WITHDRAW_MEMBER, { async: true })
  async deleteAuthCode(userId: number) {
    console.log(userId);
  }
}
