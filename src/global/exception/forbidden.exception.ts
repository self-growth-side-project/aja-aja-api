import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class ForbiddenException extends BaseException {
  static readonly ErrorCodes = {
    NO_PERMISSION: ErrorCode.create(403000, '권한이 없습니다.'),
    NO_PERMISSION_TO_ACCESS_WISE_MAN_OPINION: ErrorCode.create(403001, '성인의 생각에 접근할 권한이 없습니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.FORBIDDEN, errorCode.code, errorCode.message, data);
  }
}
