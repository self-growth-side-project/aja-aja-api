import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthService } from '../../../auth/application/service/auth.service';

@Injectable()
export class MemberListener {
  public static readonly WITHDRAW_MEMBER = 'member.withdraw';

  constructor(private readonly authService: AuthService) {}

  @OnEvent(MemberListener.WITHDRAW_MEMBER, { async: true })
  async deleteAuthCode(memberId: number) {
    await this.authService.removeAuthCodes(memberId);
  }
}
