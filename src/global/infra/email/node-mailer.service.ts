/*
import { EmailService } from '../../common/domain/infra/email.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

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
        //html: '<b>Hello World</b>',
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        new ConflictException(error);
      });
  }
}
*/
