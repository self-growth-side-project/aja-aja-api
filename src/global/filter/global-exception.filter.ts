import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { BaseResponse } from '../common/interface/dto/response/base.response';
import { instanceToPlain } from 'class-transformer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GlobalContextUtil } from '../util/global-context.util';
import { TimeUtil } from '../util/time.util';
import { LocalDateTime } from '@js-joda/core';
import { HeaderContextDto } from '../context/header-context.dto';
import { MemberContextDto } from '../context/member-context.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception['response']?.message ?? exception.message;
    const stacktrace = exception.stack ?? '';
    const data = exception['response']?.data ?? {};

    const baseResponse = BaseResponse.errorBaseResponse(exception['response']?.code ?? status, message, data);

    response.status(status).json(instanceToPlain(baseResponse));

    let headerContext = null;
    let member = null;

    try {
      headerContext = GlobalContextUtil.getHeader();
      member = GlobalContextUtil.getMember();
    } catch (e) {}

    if (!headerContext) {
      headerContext = HeaderContextDto.createDefault(
        request.get('user-agent'),
        request.ip,
        request.method,
        request.originalUrl,
        request.body,
        request.query,
        request.header('x-platform-type'),
      );
    }

    this.logError(status, message, stacktrace, headerContext, member);
  }

  private logError(
    status: number,
    message: string,
    stacktrace: string,
    headerContext: HeaderContextDto,
    memberContext: MemberContextDto | null,
  ) {
    try {
      const body = {
        transactionId: headerContext.transactionId,
        status: status,
        url: `${headerContext.httpMethod} ${headerContext.url}`,
        requestBody: headerContext.requestBody,
        queryParams: headerContext.queryParams,
        ip: headerContext.ip,
        userAgent: headerContext.userAgent,
        appOsType: headerContext.appOsType?.code,
        message: message,
        stacktrace: stacktrace,
        member: memberContext,
        executionTime: `${TimeUtil.getMillisOfDuration(headerContext.startTime, LocalDateTime.now())} ms`,
      };

      if (status < 500) {
        process.env.NODE_ENV === 'prod'
          ? this.logger.warn(`${JSON.stringify(body)}`)
          : this.logger.warn(`${JSON.stringify(body, null, 2)}`);
        return;
      }

      process.env.NODE_ENV === 'prod'
        ? this.logger.error(`${JSON.stringify(body)}`)
        : this.logger.error(`${JSON.stringify(body, null, 2)}`);
    } catch (e) {
      this.logger.error(`${e}`);
    }
  }
}
