import { Inject, Injectable } from '@nestjs/common';
import { QuestionResponse } from '../../interface/dto/response/question.response';
import { AnswerCommandRepository } from '../../domain/repository/answer-command.repository';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { Answer } from '../../domain/entity/answer.entity';
import { QuestionCommandRepository } from '../../domain/repository/question-command.repository';
import { Question } from '../../domain/entity/question.entity';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { WiseManOpinionResponse } from '../../interface/dto/response/wise-man-opinion.response';
import { ForbiddenException } from '../../../global/exception/forbidden.exception';
import { CreateAnswerServiceDto } from '../dto/create-answer.service.dto';
import { ConflictException } from '../../../global/exception/conflict.exception';
import { MemberCommandRepository } from '../../../member/domain/repository/member-command.repository';
import { UpdateAnswerServiceDto } from '../dto/update-answer.service.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QuestionCommandRepository)
    private readonly questionCommandRepository: QuestionCommandRepository,

    @Inject(AnswerCommandRepository)
    private readonly answerCommandRepository: AnswerCommandRepository,

    @Inject(MemberCommandRepository)
    private readonly memberCommandRepository: MemberCommandRepository,
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

  async getWiseManOpinion(questionId: number): Promise<WiseManOpinionResponse> {
    const foundAnswer = await this.answerCommandRepository.findByQuestionIdAndMemberId(
      questionId,
      GlobalContextUtil.getMember().id,
    );

    if (!foundAnswer || !foundAnswer.canAccessWiseManOpinion()) {
      throw new ForbiddenException(ForbiddenException.ErrorCodes.NO_PERMISSION_TO_ACCESS_WISE_MAN_OPINION);
    }

    return WiseManOpinionResponse.fromQuestionEntity(foundAnswer.question);
  }

  async createAnswer(serviceDto: CreateAnswerServiceDto): Promise<Answer> {
    const memberId = GlobalContextUtil.getMember().id;
    const foundMember = await this.memberCommandRepository.findById(memberId);

    if (!foundMember) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_MEMBER);
    }

    const foundQuestion = await this.questionCommandRepository.findById(serviceDto.questionId);

    if (!foundQuestion) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
    }

    const foundTodayQuestion = await this.getQuestionOfToday();

    if (!foundTodayQuestion || !foundQuestion.isEqualToId(foundTodayQuestion.id)) {
      throw new ConflictException(ConflictException.ErrorCodes.FAILED_TO_CREATE_ANSWER);
    }

    const foundAnswer: Answer | null = await this.answerCommandRepository.findByQuestionIdAndMemberId(
      foundQuestion.id,
      memberId,
    );

    if (foundAnswer) {
      throw new ConflictException(ConflictException.ErrorCodes.FAILED_TO_CREATE_ANSWER);
    }

    return await this.answerCommandRepository.save(Answer.create(serviceDto.content, foundQuestion, foundMember));
  }

  async updateAnswer(serviceDto: UpdateAnswerServiceDto): Promise<Answer> {
    const foundAnswer: Answer | null = await this.answerCommandRepository.findByIdAndQuestionIdAndMemberId(
      serviceDto.answerId,
      serviceDto.questionId,
      GlobalContextUtil.getMember().id,
    );

    if (!foundAnswer) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_ANSWER);
    }

    foundAnswer.update(serviceDto);

    return await this.answerCommandRepository.save(foundAnswer);
  }

  private async getFirstQuestion(): Promise<QuestionResponse | null> {
    const foundFirstQuestion: Question | null = await this.questionCommandRepository.findTopByOrderBySeqAsc();

    if (!foundFirstQuestion) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_QUESTION);
    }

    return QuestionResponse.fromQuestionEntity(foundFirstQuestion);
  }
}
