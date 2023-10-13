import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GlobalContextUtil } from '../util/global-context.util';
import { HeaderContextDto } from '../context/header-context.dto';
import { RandomUtil } from '../util/random.util';
import { LocalDateTime } from '@js-joda/core';
import { AppOsType } from '../common/domain/enum/app-os-type.enum';

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const transactionId = RandomUtil.generateUuidV4();
    const userAgent = req.get('user-agent');
    const ip = req.ip;
    const appOsType = req.header('x-platform-type') ? AppOsType.findCode(req.header('x-platform-type')!) : null;
    const httpMethod = req.method;
    const url = req.originalUrl;
    const requestBody = req.body;
    const queryParams = req.query;
    const startTime = LocalDateTime.now();

    GlobalContextUtil.setHeader(
      HeaderContextDto.of(
        transactionId,
        userAgent,
        ip,
        httpMethod,
        url,
        requestBody,
        queryParams,
        appOsType,
        startTime,
      ),
    );

    next();
  }
}
