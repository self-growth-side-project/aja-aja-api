import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsPassword } from '../../../global/common/decorator/validator.decorator';
import { SignUpServiceDto } from '../../application/dto/sign-up.service.dto';

export class SignUpRequest {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsPassword()
  public password!: string;

  public toServiceDto(): SignUpServiceDto {
    return SignUpServiceDto.of(this.email, this.password);
  }
}
