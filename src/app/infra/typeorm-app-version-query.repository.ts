import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AppVersionQueryRepository } from '../domain/repository/app-version-query.repository';
import { AppVersion } from '../domain/entity/app.version';
import { AppVersionCondition } from '../domain/repository/dto/app-version.condition';
import { AppVersionResponse } from '../interface/dto/response/app-version.response';

@Injectable()
export class TypeormAppVersionQueryRepository implements AppVersionQueryRepository {
  constructor(
    @InjectRepository(AppVersion)
    private readonly appVersionRepository: Repository<AppVersion>,
  ) {}

  async find(condition: AppVersionCondition): Promise<AppVersionResponse | null> {
    const queryBuilder = this.appVersionRepository
      .createQueryBuilder('appVersion')
      .select([
        'appVersion.latestVersion as _latestVersion',
        'appVersion.recommendedThresholdVersion as _recommendedThresholdVersion',
        'appVersion.recommendedTitle as _recommendedTitle',
        'appVersion.recommendedMessage as _recommendedMessage',
        'appVersion.forceThresholdVersion as _forceThresholdVersion',
        'appVersion.forceTitle as _forceTitle',
        'appVersion.forceMessage as _forceMessage',
      ]);

    this.eqOsType(queryBuilder, condition.appOsType);

    const result = (await queryBuilder.getRawOne()) as unknown;
    return result ? plainToInstance(AppVersionResponse, result) : null;
  }

  private eqOsType(queryBuilder: SelectQueryBuilder<AppVersion>, appOsType?: string | null | undefined): void {
    if (!appOsType) {
      return;
    }

    queryBuilder.andWhere('appVersion.appOsType = :appOsType', { appOsType });
  }
}
