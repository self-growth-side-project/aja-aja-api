import { Inject, Injectable } from '@nestjs/common';
import { QuestionResponse } from '../../interface/dto/response/question.response';
import { AnswerCommandRepository } from '../../domain/repository/answer-command.repository';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { Answer } from '../../domain/entity/answer.entity';
import { QuestionCommandRepository } from '../../domain/repository/question-command.repository';
import { Question } from '../../domain/entity/question.entity';
import { NotFoundException } from '../../../global/exception/not-found.exception';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QuestionCommandRepository)
    private readonly questionCommandRepository: QuestionCommandRepository,

    @Inject(AnswerCommandRepository)
    private readonly answerCommandRepository: AnswerCommandRepository,
  ) {}

  async getQuestionOfToday(): Promise<QuestionResponse | null> {
    const foundLastAnswer: Answer | null = await this.answerCommandRepository.findTopByMemberIdAndOrderByIdDesc(
      GlobalContextUtil.getMember().id,
    );

    if (!foundLastAnswer) {
      return await this.getFirstQuestion();
    }

    const isWrittenOnToday = foundLastAnswer.isWrittenOnToday();

    if (isWrittenOnToday) {
      return QuestionResponse.fromAnswerEntity(foundLastAnswer);
    }

    if (foundLastAnswer.isOvernight()) {
      const nextQuestion = await this.questionCommandRepository.findBySeq(foundLastAnswer.question.getNextSeq());
      return QuestionResponse.fromQuestionEntity(nextQuestion);
    }

    throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
  }

  private async getFirstQuestion(): Promise<QuestionResponse | null> {
    const foundFirstQuestion: Question | null = await this.questionCommandRepository.findTopByOrderBySeqAsc();

    if (!foundFirstQuestion) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
    }

    return QuestionResponse.fromQuestionEntity(foundFirstQuestion);
  }
}
