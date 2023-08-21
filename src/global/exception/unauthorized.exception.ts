import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends BaseException {
  static readonly ErrorCodes = {
    INVALID_TOKEN: ErrorCode.create(401000, '토큰이 유효하지 않습니다.'),
    INVALID_CREDENTIALS: ErrorCode.create(
      401001,
      '로그인이 되지 않았습니다.\n' + '아이디와 비밀번호 다시 한번 확인해주세요.',
    ),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.UNAUTHORIZED, errorCode.code, errorCode.message, data);
  }
}
