import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAnswerServiceDto } from '../../../application/dto/create-answer.service.dto';

export class CreateAnswerRequest {
  @IsString()
  @IsNotEmpty()
  public content: string;

  public toServiceDto(questionId: number): CreateAnswerServiceDto {
    return CreateAnswerServiceDto.of(questionId, this.content);
  }
}
