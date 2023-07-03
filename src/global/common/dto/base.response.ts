import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeToString } from '../decorator/transformer.decorator';

export class BaseResponse<T> {
  code: number;
  message: string;
  data: T;
  @LocalDateTimeToString()
  timestamp: LocalDateTime;

  public static successBaseResponse<U>(data: U): BaseResponse<U> {
    const response = new BaseResponse<U>();
    response.code = 200;
    response.message = 'OK';
    response.data = data;
    response.timestamp = LocalDateTime.now();

    return response;
  }

  public static errorBaseResponse<U>(code: number, message: string, data: U): BaseResponse<U> {
    const response = new BaseResponse<U>();
    response.code = code;
    response.message = message;
    response.data = data;
    response.timestamp = LocalDateTime.now();

    return response;
  }

  public static voidBaseResponse(): BaseResponse<Void> {
    const response = new BaseResponse<Void>();
    response.code = 200;
    response.message = 'OK';
    response.data = {};
    response.timestamp = LocalDateTime.now();

    return response;
  }
}
