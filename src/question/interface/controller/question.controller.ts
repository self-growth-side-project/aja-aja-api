import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { QuestionResponse } from '../dto/response/question.response';
import { QuestionService } from '../../application/service/question.service';
import { WiseManOpinionResponse } from '../dto/response/wise-man-opinion.response';
import { AnswerQueryRepository } from '../../domain/repository/answer-query.repository';
import { AnswerResponse } from '../dto/response/answer.response';
import { AnswerCondition } from '../../domain/repository/dto/answer.condition';
import { GlobalContextUtil } from '../../../global/util/global-context.util';
import { NotFoundException } from '../../../global/exception/not-found.exception';
import { CreateAnswerRequest } from '../dto/request/create-answer.request';

@Controller('/questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,

    @Inject(AnswerQueryRepository)
    private readonly answerQueryRepository: AnswerQueryRepository,
  ) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/today')
  async getQuestionOfToday(): Promise<BaseResponse<QuestionResponse | null>> {
    return BaseResponse.successBaseResponse(await this.questionService.getQuestionOfToday());
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/:id/wise-man-opinion')
  async getWiseManOpinion(@Param('id', ParseIntPipe) id: number): Promise<BaseResponse<WiseManOpinionResponse>> {
    return BaseResponse.successBaseResponse(await this.questionService.getWiseManOpinion(id));
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('/:id/answers')
  async createAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: CreateAnswerRequest,
  ): Promise<BaseResponse<AnswerResponse>> {
    return BaseResponse.successBaseResponse(
      AnswerResponse.fromEntity(await this.questionService.createAnswer(request.toServiceDto(id))),
    );
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Put('/:questionId/answers/:answerId')
  async updateAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('answerId', ParseIntPipe) answerId: number,
  ): Promise<BaseResponse<Void>> {
    console.log(questionId, answerId);
    return BaseResponse.voidBaseResponse();
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/:id/answers/me')
  async getMyAnswer(@Param('id', ParseIntPipe) id: number): Promise<BaseResponse<AnswerResponse>> {
    const result = await this.answerQueryRepository.find(
      AnswerCondition.of(null, null, null, null, id, GlobalContextUtil.getMember().id),
    );

    if (!result) {
      throw new NotFoundException(NotFoundException.ErrorCodes.NOT_FOUND_ANSWER);
    }

    return BaseResponse.successBaseResponse(result);
  }
}
