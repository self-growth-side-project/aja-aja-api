import { ValueTransformer } from 'typeorm';
import { AppOsType } from '../../../global/common/domain/enum/app-os-type.enum';

export class AppOsTypeTransformer implements ValueTransformer {
  to(entityValue: AppOsType): string | null {
    if (!entityValue) {
      return null;
    }

    return entityValue.enumName;
  }

  from(databaseValue: string): AppOsType | null {
    if (!databaseValue) {
      return null;
    }

    return AppOsType.valueByName(databaseValue);
  }
}
