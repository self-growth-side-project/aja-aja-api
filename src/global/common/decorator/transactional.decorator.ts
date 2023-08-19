import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';
import { NAMESPACE_AJA_AJA, NAMESPACE_ENTITY_MANAGER } from '../constant/namespace';
import { InternalServerException } from '../../exception/internal-server.exception';

export function Transactional() {
  return function (_target: object, _propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originMethod = descriptor.value;

    async function transactionWrapped(this: any, ...args: unknown[]) {
      const nameSpace = getNamespace(NAMESPACE_AJA_AJA);
      if (!nameSpace || !nameSpace.active) {
        throw new InternalServerException(
          InternalServerException.ErrorCodes.FAILED_TO_GET_NAMESPACE,
          `${NAMESPACE_AJA_AJA}`,
        );
      }

      const entityManager = nameSpace.get(NAMESPACE_ENTITY_MANAGER) as EntityManager;
      if (!entityManager) {
        throw new InternalServerException(
          InternalServerException.ErrorCodes.FAILED_TO_GET_NAMESPACE,
          `${NAMESPACE_AJA_AJA} 에 Entity Manager 가 없습니다.`,
        );
      }

      return await entityManager.transaction(async (tx: EntityManager) => {
        nameSpace.set(NAMESPACE_ENTITY_MANAGER, tx);
        return await originMethod.apply(this, args);
      });
    }

    descriptor.value = transactionWrapped;
  };
}
