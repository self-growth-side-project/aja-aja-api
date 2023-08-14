import { EmailService } from '../../common/domain/infra/email.service';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InternalServerException } from '../../exception/internal-server.exception';

@Injectable()
export class NodeMailerService implements EmailService {
  constructor(private readonly mailerService: MailerService) {}
  send(to: string, subject: string, content: string): void {
    this.mailerService
      .sendMail({
        to: to,
        //from: 'noreplay@gmail.com',
        subject: subject,
        text: content,
      })
      .catch(e => {
        console.log(e);
        throw new InternalServerException(InternalServerException.ErrorCodes.FAILED_TO_SEND_EMAIL);
      });
  }
}
