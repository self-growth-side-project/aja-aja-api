import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends BaseException {
  static readonly ErrorCodes = {
    INVALID_PARAMETER: ErrorCode.create(400000, '유효하지 않은 파라미터입니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.BAD_REQUEST, errorCode.code, errorCode.message, data);
  }
}
