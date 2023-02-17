import { SendGridService } from "@anchan828/nest-sendgrid";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IFromResponses, ISendMail } from "src/common/interfaces";
import { SharedService } from "src/shared/shared.service";

@Injectable()
export class MailService {
  constructor(
    private readonly sendgridService: SendGridService,
    private readonly sharedService: SharedService,
  ) {}

  async sendMailWithSendGrid({ email, text, subject, html }: ISendMail) {
    try {
      return await this.sendgridService.send({
        to: "pakphom1@hotmail.com",
        from: "mcast31mcast31@gmail.com",
        subject: subject,
        text: text,
        html: html,
      });
    } catch (error) {
      const { message } = error as { message: string };
      return this.sharedService.returnResponse(
        false,
        HttpStatus.FORBIDDEN,
        this.sharedService.statusText(HttpStatus.FORBIDDEN),
        null,
        message,
      ) as IFromResponses;
    }
  }
}
