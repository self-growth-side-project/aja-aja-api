/*
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodeMailerService } from './node-mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [
    {
      provide: 'EmailService',
      useClass: NodeMailerService,
    },
  ],
  exports: [
    {
      provide: 'EmailService',
      useClass: NodeMailerService,
    },
  ],
})
export class EmailModule {}
*/
