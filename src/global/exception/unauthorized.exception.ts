import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends BaseException {
  static readonly ErrorCodes = {
    INVALID_CREDENTIALS: ErrorCode.create(
      401001,
      '로그인이 되지 않았습니다.\n' + '아이디와 비밀번호 다시 한번 확인해주세요.',
    ),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.UNAUTHORIZED, errorCode.code, errorCode.message, data);
  }
}
