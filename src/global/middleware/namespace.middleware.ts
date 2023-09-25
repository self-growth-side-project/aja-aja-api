import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createNamespace, getNamespace } from 'cls-hooked';
import { NAMESPACE_AJA_AJA } from '../common/constant/namespace.code';

@Injectable()
export class NamespaceMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    const namespace = getNamespace(NAMESPACE_AJA_AJA) ?? createNamespace(NAMESPACE_AJA_AJA);
    namespace.run(() => {
      next();
    });
  }
}
