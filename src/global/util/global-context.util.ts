import { getNamespace } from 'cls-hooked';
import { NAMESPACE_AJA_AJA, NAMESPACE_ENTITY_MANAGER, NAMESPACE_MEMBER } from '../common/constant/namespace.code';
import { InternalServerException } from '../exception/internal-server.exception';
import { EntityManager } from 'typeorm';
import { MemberContextDto } from '../context/member-context.dto';

export class GlobalContextUtil {
  public static getMainNamespace(): any {
    const namespace = getNamespace(NAMESPACE_AJA_AJA);

    if (!namespace || !namespace.active) {
      throw new InternalServerException(InternalServerException.ErrorCodes.FAILED_TO_GET_NAMESPACE);
    }

    return namespace;
  }
  public static getMember(): MemberContextDto {
    return this.getMainNamespace().get(NAMESPACE_MEMBER);
  }

  public static getEntityManager(): EntityManager {
    return this.getMainNamespace().get(NAMESPACE_ENTITY_MANAGER);
  }
}
