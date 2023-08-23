import { EntityManager } from 'typeorm';
import { NAMESPACE_AJA_AJA, NAMESPACE_ENTITY_MANAGER } from '../constant/namespace.code';
import { InternalServerException } from '../../exception/internal-server.exception';
import { GlobalContextUtil } from '../../util/global-context.util';

export function Transactional() {
  return function (_target: object, _propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originMethod = descriptor.value;

    async function transactionWrapped(this: any, ...args: unknown[]) {
      const entityManager = GlobalContextUtil.getEntityManager();

      if (!entityManager) {
        throw new InternalServerException(
          InternalServerException.ErrorCodes.FAILED_TO_GET_NAMESPACE,
          `${NAMESPACE_AJA_AJA} 에 Entity Manager 가 없습니다.`,
        );
      }

      return await entityManager.transaction(async (tx: EntityManager) => {
        GlobalContextUtil.getMainNamespace().set(NAMESPACE_ENTITY_MANAGER, tx);
        return await originMethod.apply(this, args);
      });
    }

    descriptor.value = transactionWrapped;
  };
}
