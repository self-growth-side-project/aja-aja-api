import { IsEmail, IsNotEmpty } from 'class-validator';
import { ValidationMessage } from '../../../global/common/constant/validation.message';
import { CheckLoginIdServiceDto } from '../../application/dto/check-login-id.service.dto';

export class CheckLoginIdRequest {
  @IsNotEmpty({ message: ValidationMessage.email.isEmpty })
  @IsEmail({}, { message: ValidationMessage.email.isEmail })
  loginId: string;

  public toServiceDto(): CheckLoginIdServiceDto {
    return CheckLoginIdServiceDto.of(this.loginId);
  }
}
