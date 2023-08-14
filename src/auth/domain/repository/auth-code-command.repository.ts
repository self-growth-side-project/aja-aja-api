import { AuthCode } from '../entity/AuthCode';
import { AuthCodeType } from '../enum/AuthCodeType';

export interface AuthCodeCommandRepository {
  save(authCode: AuthCode): Promise<AuthCode>;

  findByMemberIdAndType(memberId: number, type: AuthCodeType): Promise<AuthCode | null>;

  remove(authCode: AuthCode): Promise<void>;
}
