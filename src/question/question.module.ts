import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './domain/entity/question.entity';
import { Answer } from './domain/entity/answer.entity';
import { QuestionController } from './interface/controller/question.controller';
import { AnswerCommandRepository } from './domain/repository/answer-command.repository';
import { TypeormAnswerCommandRepository } from './infra/typeorm-answer-command.repository';
import { QuestionCommandRepository } from './domain/repository/question-command.repository';
import { TypeormQuestionCommandRepository } from './infra/typeorm-question-command.repository';
import { QuestionService } from './application/service/question.service';
import { AnswerQueryRepository } from './domain/repository/answer-query.repository';
import { TypeormAnswerQueryRepository } from './infra/typeorm-answer-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: QuestionCommandRepository,
      useClass: TypeormQuestionCommandRepository,
    },
    {
      provide: AnswerCommandRepository,
      useClass: TypeormAnswerCommandRepository,
    },
    {
      provide: AnswerQueryRepository,
      useClass: TypeormAnswerQueryRepository,
    },
  ],
  exports: [],
})
export class QuestionModule {}
