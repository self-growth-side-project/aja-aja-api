import { Injectable } from '@nestjs/common';
import { Member } from '../../../member/domain/entity/member.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadServiceDto } from '../dto/token-payload.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { RandomUtil } from '../../../global/util/random.util';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(member: Member): Promise<string> {
    if (!member.id) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    return this.jwtService.sign(
      new TokenPayloadServiceDto(RandomUtil.generateUuidV4(), member.id, member.email, member.role).toPlain(),
    );
  }

  async createRefreshToken(member: Member): Promise<string> {
    if (!member.id) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    return this.jwtService.sign(
      new TokenPayloadServiceDto(RandomUtil.generateUuidV4(), member.id, member.email, member.role).toPlain(),
      {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      },
    );
  }
}
