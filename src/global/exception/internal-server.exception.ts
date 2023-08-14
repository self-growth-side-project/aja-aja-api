import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class InternalServerException extends BaseException {
  static readonly ErrorCodes = {
    FAILED_TO_GENERATE_UUID: ErrorCode.create(500000, 'UUID 를 생성할 수 없습니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, errorCode.code, errorCode.message, data);
  }
}
