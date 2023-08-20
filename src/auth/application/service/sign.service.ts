import { Inject, Injectable } from '@nestjs/common';
import { SignUpServiceDto } from '../dto/sign-up.service.dto';
import { Member } from '../../../member/domain/entity/member.entity';
import { PasswordBcrypter } from '../../domain/PasswordBcrypter';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { ConflictException } from '../../../global/exception/conflict.exception';
import { SignInServiceDto } from '../dto/sign-in.service.dto';
import { TokenServiceDto } from '../dto/token.service.dto';
import { JwtTokenService } from './jwt-token.service';
import { UnauthorizedException } from '../../../global/exception/unauthorized.exception';
import { PasswordEncrypter } from '../../domain/PasswordEncrypter';

@Injectable()
export class SignService {
  constructor(
    private readonly passwordBcrypter: PasswordBcrypter,
    private readonly jwtTokenService: JwtTokenService,

    @Inject(MemberCommandRepository)
    private readonly memberCommandRepository: MemberCommandRepository,

    @Inject(PasswordEncrypter)
    private readonly passwordEncrypter: PasswordEncrypter,
  ) {}

  async signUp(dto: SignUpServiceDto): Promise<Member> {
    const member = await Member.signUpMember(dto.email, dto.password, this.passwordBcrypter);

    if (await this.memberCommandRepository.existByEmail(member.email)) {
      throw new ConflictException(ConflictException.ErrorCodes.DUPLICATE_EMAIL);
    }

    await this.memberCommandRepository.save(member);

    return member;
  }

  async signIn(dto: SignInServiceDto): Promise<TokenServiceDto> {
    const foundMember = await this.memberCommandRepository.findByEmail(dto.email);

    if (!foundMember) {
      throw new UnauthorizedException(UnauthorizedException.ErrorCodes.INVALID_CREDENTIALS);
    }

    if (!(await foundMember.isMatchPassword(dto.password, this.passwordEncrypter))) {
      throw new UnauthorizedException(UnauthorizedException.ErrorCodes.INVALID_CREDENTIALS);
    }

    await this.jwtTokenService.createAccessToken(foundMember);

    return TokenServiceDto.of(
      await this.jwtTokenService.createAccessToken(foundMember),
      await this.jwtTokenService.createRefreshToken(foundMember),
    );
  }
}
