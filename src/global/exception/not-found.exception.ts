import { BaseException } from './base.exception';
import { ErrorCode } from './ErrorCode';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends BaseException {
  static readonly ErrorCodes = {
    NOT_FOUND_MEMBER: ErrorCode.create(404001, '가입된 회원이 아닙니다.'),
    NOT_FOUND_REFRESH_TOKEN: ErrorCode.create(404002, 'Refresh Token 을 찾을 수 없습니다.'),
    NOT_FOUND_QUESTION: ErrorCode.create(404003, '질문을 찾을 수 없습니다.'),
    NOT_FOUND_ANSWER: ErrorCode.create(404004, '나만의 생각을 찾을 수 없습니다.'),
  };

  constructor(errorCode: ErrorCode, data?: any) {
    super(HttpStatus.NOT_FOUND, errorCode.code, errorCode.message, data);
  }
}
