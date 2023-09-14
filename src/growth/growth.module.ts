import { Module } from '@nestjs/common';
import { GrowthController } from './interface/controller/growth.controller';

@Module({
  controllers: [GrowthController],
  providers: [],
  exports: [],
})
export class GrowthModule {}
