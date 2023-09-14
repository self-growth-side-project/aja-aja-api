import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateAnswerServiceDto } from '../../../application/dto/update-answer.service.dto';

export class UpdateAnswerRequest {
  @IsString()
  @IsNotEmpty()
  public content: string;

  public toServiceDto(questionId: number, answerId: number): UpdateAnswerServiceDto {
    return UpdateAnswerServiceDto.of(questionId, answerId, this.content);
  }
}
