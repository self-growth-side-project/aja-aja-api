import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class InternalServerException extends BaseException {
  static readonly ErrorCodes = {
    FAILED_TO_GENERATE_UUID: ErrorCode.create(500000, 'UUID 를 생성할 수 없습니다.'),
    FAILED_TO_SEND_EMAIL: ErrorCode.create(500001, 'EMAIL 을 보낼 수 없습니다.'),
    FAILED_TO_GENERATE_AUTH_CODE: ErrorCode.create(500002, 'auth code 를 생성할 수 없습니다.'),
    FAILED_TO_GET_NAMESPACE: ErrorCode.create(500003, 'namespace 를 가져올 수 없습니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, errorCode.code, errorCode.message, data);
  }
}
