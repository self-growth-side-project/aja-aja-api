import { Module } from '@nestjs/common';
import { AppController } from './interface/controller/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppVersion } from './domain/entity/app-version.entity';
import { AppVersionQueryRepository } from './domain/repository/app-version-query.repository';
import { TypeormAppVersionQueryRepository } from './infra/typeorm-app-version-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AppVersion])],
  controllers: [AppController],
  providers: [
    {
      provide: AppVersionQueryRepository,
      useClass: TypeormAppVersionQueryRepository,
    },
  ],
})
export class AppModule {}
