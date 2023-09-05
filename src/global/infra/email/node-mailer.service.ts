import { EmailService } from '../../common/domain/service/email.service';
import { Injectable } from '@nestjs/common';
import { InternalServerException } from '../../exception/internal-server.exception';
import * as nodemailer from 'nodemailer';
import * as process from 'process';

@Injectable()
export class NodeMailerService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  send(to: string, subject: string, content: string): void {
    this.transporter
      .sendMail({
        to: to,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        text: content,
      })
      .catch(e => {
        console.log(e);
        throw new InternalServerException(InternalServerException.ErrorCodes.FAILED_TO_SEND_EMAIL);
      });
  }
}
