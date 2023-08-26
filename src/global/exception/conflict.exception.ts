import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class ConflictException extends BaseException {
  static readonly ErrorCodes = {
    DUPLICATE_EMAIL: ErrorCode.create(409001, '가입된 이메일입니다.'),
    DUPLICATE_BACKUP_PENDING_REQUEST: ErrorCode.create(409002, '이미 진행중인 백업신청이 존재합니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.CONFLICT, errorCode.code, errorCode.message, data);
  }
}
