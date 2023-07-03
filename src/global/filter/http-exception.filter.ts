import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { BaseResponse } from '../common/dto/base.response';
import { instanceToPlain } from 'class-transformer';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();

    const baseResponse = BaseResponse.errorBaseResponse(
      exception['response'].code,
      exception['response'].message,
      exception['response'].data,
    );

    response.status(status).json(instanceToPlain(baseResponse));
  }
}
