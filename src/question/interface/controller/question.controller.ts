import { Controller, Get, Param, UseGuards, Version } from '@nestjs/common';
import { BaseResponse } from '../../../global/common/interface/dto/response/base.response';
import { JwtAuthGuard } from '../../../auth/guard/jwt-auth.guard';
import { QuestionResponse } from '../dto/response/question.response';
import { QuestionService } from '../../application/service/question.service';

@Controller('/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/today')
  async getQuestionOfToday(): Promise<BaseResponse<QuestionResponse | null>> {
    return BaseResponse.successBaseResponse(await this.questionService.getQuestionOfToday());
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('/:id/wise-man-opinion')
  async getWiseManOpinion(@Param('id') id: number): Promise<BaseResponse<Void>> {
    console.log(id);
    return BaseResponse.voidBaseResponse();
  }
}
