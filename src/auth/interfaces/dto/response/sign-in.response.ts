import { Exclude, Expose } from 'class-transformer';
import { TokenServiceDto } from '../../../application/dto/token.service.dto';

export class SignInResponse {
  @Exclude() private readonly _accessToken: string;
  @Exclude() private readonly _refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
  }

  @Expose()
  get accessToken(): string {
    return this._accessToken;
  }

  @Expose()
  get refreshToken(): string {
    return this._refreshToken;
  }

  public static from(dto: TokenServiceDto): SignInResponse {
    return new SignInResponse(dto.accessToken, dto.refreshToken);
  }
}
