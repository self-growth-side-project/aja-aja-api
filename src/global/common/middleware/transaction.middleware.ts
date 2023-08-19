import { Injectable, NestMiddleware } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { NextFunction } from 'express';
import { createNamespace, getNamespace } from 'cls-hooked';
import { NAMESPACE_AJA_AJA, NAMESPACE_ENTITY_MANAGER } from '../constant/namespace';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}
  use(_req: Request, _res: Response, next: NextFunction) {
    const namespace = getNamespace(NAMESPACE_AJA_AJA) ?? createNamespace(NAMESPACE_AJA_AJA);

    return namespace.runAndReturn(async () => {
      Promise.resolve()
        .then(() => this.setEntityManager())
        .then(next);
    });
  }

  private setEntityManager() {
    const namespace = getNamespace(NAMESPACE_AJA_AJA)!;
    namespace.set(NAMESPACE_ENTITY_MANAGER, this.em);
  }
}
