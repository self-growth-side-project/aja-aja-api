import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { EmailService } from '../../common/infra/email/email.service';

@Module({
  providers: [
    {
      provide: EmailService,
      useClass: NodeMailerService,
    },
  ],
  exports: [
    {
      provide: EmailService,
      useClass: NodeMailerService,
    },
  ],
})
export class EmailModule {}
