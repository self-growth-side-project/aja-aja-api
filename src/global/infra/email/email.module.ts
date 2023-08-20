import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodeMailerService } from './node-mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '../../common/domain/infra/email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('EMAIL_SENDER'),
        },
      }),
      inject: [ConfigService], // useFactory에서 사용할 의존성을 명시합니다.
    }),
  ],
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
