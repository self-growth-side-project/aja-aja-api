import { Module } from '@nestjs/common';
import { GrowthController } from './interface/controller/growth.controller';
import { GrowthQueryRepository } from './domain/repository/growth-query.repository';
import { TypeormGrowthQueryRepository } from './infra/typeorm-growth-query.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../question/domain/entity/question.entity';
import { Answer } from '../question/domain/entity/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [GrowthController],
  providers: [
    {
      provide: GrowthQueryRepository,
      useClass: TypeormGrowthQueryRepository,
    },
  ],
  exports: [],
})
export class GrowthModule {}
