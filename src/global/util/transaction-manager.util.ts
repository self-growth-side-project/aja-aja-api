import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { getNamespace } from 'cls-hooked';
import { NAMESPACE_AJA_AJA, NAMESPACE_ENTITY_MANAGER } from '../common/constant/namespace';
import { InternalServerException } from '../exception/internal-server.exception';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(NAMESPACE_AJA_AJA);
    if (!nameSpace || !nameSpace.active) {
      throw new InternalServerException(
        InternalServerException.ErrorCodes.FAILED_TO_GET_NAMESPACE,
        `${NAMESPACE_AJA_AJA}`,
      );
    }

    return nameSpace.get(NAMESPACE_ENTITY_MANAGER);
  }
}
