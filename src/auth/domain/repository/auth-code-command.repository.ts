import { AuthCode } from '../entity/auth-code.entity';
import { AuthCodeType } from '../enum/AuthCodeType';

export interface AuthCodeCommandRepository {
  save(authCode: AuthCode): Promise<AuthCode>;

  findAllByMemberIdAndTypeAndCreatedAtToday(memberId: number, type: AuthCodeType): Promise<AuthCode[]>;

  findByCode(code: string): Promise<AuthCode | null>;

  remove(authCode: AuthCode): Promise<void>;
}
