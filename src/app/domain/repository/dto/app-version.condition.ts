import { AppOsType } from '../../../../global/common/domain/enum/app-os-type.enum';

export class AppVersionCondition {
  appOsType?: string | null | undefined;

  private constructor(appOsType?: AppOsType | null | undefined) {
    this.appOsType = appOsType?.code;
  }

  public static of(appOsType?: AppOsType | null | undefined): AppVersionCondition {
    return new AppVersionCondition(appOsType);
  }
}
