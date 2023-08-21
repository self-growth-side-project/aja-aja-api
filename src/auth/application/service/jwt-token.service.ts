import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../../../member/domain/entity/member.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadServiceDto } from '../dto/token-payload.service.dto';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { RandomUtil } from '../../../global/util/random.util';
import { RefreshToken } from '../../domain/entity/refresh-token.entity';
import { RefreshTokenCommandRepository } from '../../domain/repository/refresh-token-command.repository';
import { RefreshTokenEncrypter } from '../../domain/RefreshTokenEncrypter';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(RefreshTokenCommandRepository)
    private readonly refreshTokenCommandRepository: RefreshTokenCommandRepository,

    @Inject(RefreshTokenEncrypter)
    private readonly refreshTokenEncrypter: RefreshTokenEncrypter,
  ) {}

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

    const refreshToken = RefreshToken.create(member, this.jwtService);

    const token = refreshToken.token;

    await refreshToken.hashRefreshToken(this.refreshTokenEncrypter);

    await this.refreshTokenCommandRepository.save(refreshToken);

    return token;
  }
}
