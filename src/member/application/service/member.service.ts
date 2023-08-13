import { Injectable } from '@nestjs/common';
import { CheckLoginIdServiceDto } from '../dto/check-login-id.service.dto';

@Injectable()
export class MemberService {
  async checkLoginIdDuplication(dto: CheckLoginIdServiceDto): Promise<null> {
    console.log(dto);
    return null;
  }
}
