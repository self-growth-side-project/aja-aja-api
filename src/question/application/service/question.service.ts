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
    //1. 사용자의 마지막 답변을 찾고 없는 경우 첫번째 질문을 반환하도록 처리
    const foundLastAnswer: Answer | null = await this.answerCommandRepository.findTopByMemberIdAndOrderByIdDesc(
      GlobalContextUtil.getMember().id,
    );

    if (!foundLastAnswer) {
      const foundFirstQuestion: Question | null = await this.questionCommandRepository.findTopByOrderBySeqAsc();
      if (!foundFirstQuestion) {
        throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
      }
      return QuestionResponse.fromQuestionEntity(foundFirstQuestion);
    }

    //2. 마지막 답변이 있는 경우 그게 오늘이라면 답변의 해당 질문을 반환하도록 처리 (작성 30분 유무에 따라 성인의 생각 유무 판단)
    const isWrittenOnToday = foundLastAnswer.isWrittenOnToday();

    if (isWrittenOnToday) {
      return QuestionResponse.fromAnswerEntity(foundLastAnswer);
    }

    //3. 마지막 답변이 있지만 그게 과거라면 답변의 다음 질문을 반환하도록 처리
    if (foundLastAnswer.isOvernight()) {
      const nextQuestion = await this.questionCommandRepository.findBySeq(foundLastAnswer.question.getNextSeq());
      return QuestionResponse.fromQuestionEntity(nextQuestion);
    }

    throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
  }
}
