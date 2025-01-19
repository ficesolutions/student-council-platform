import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDTO } from './dtos/email.dto';

@Injectable()
export class EmailService {

  constructor (private readonly mailerService: MailerService,) {}

  async sendEmail ({ to, subject, message, link }: EmailDTO) {
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: `${message}\n${link}`,
    });
  }
}
