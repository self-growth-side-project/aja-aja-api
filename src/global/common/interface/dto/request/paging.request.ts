import { IsNumber, IsOptional, Min } from 'class-validator';
import { ToNumber } from '../../../decorator/transformer.decorator';
import { ValidationMessage } from '../../../constant/validation.message';

export abstract class PagingRequest {
  @IsOptional()
  @ToNumber()
  @IsNumber()
  @Min(1, { message: ValidationMessage.page.min })
  page?: number;

  @IsOptional()
  @ToNumber()
  @IsNumber()
  @Min(1, { message: ValidationMessage.size.min })
  size?: number;
}
