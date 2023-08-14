import { ValueTransformer } from 'typeorm';
import { AuthCodeType } from '../../domain/enum/AuthCodeType';

export class AuthCodeTypeTransformer implements ValueTransformer {
  to(entityValue: AuthCodeType): string | null {
    if (!entityValue) {
      return null;
    }

    return entityValue.enumName;
  }

  from(databaseValue: string): AuthCodeType | null {
    if (!databaseValue) {
      return null;
    }

    return AuthCodeType.valueByName(databaseValue);
  }
}
