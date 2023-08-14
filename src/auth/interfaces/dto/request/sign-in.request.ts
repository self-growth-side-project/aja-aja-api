import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsPassword } from '../../../../global/common/decorator/validator.decorator';
import { ValidationMessage } from '../../../../global/common/constant/validation.message';
import { SignInServiceDto } from '../../../application/dto/sign-in.service.dto';

export class SignInRequest {
  @IsNotEmpty({ message: ValidationMessage.email.isEmpty })
  @IsEmail({}, { message: ValidationMessage.email.isEmail })
  public loginId!: string;

  @IsPassword()
  public password!: string;

  public toServiceDto(): SignInServiceDto {
    return SignInServiceDto.of(this.loginId, this.password);
  }
}
