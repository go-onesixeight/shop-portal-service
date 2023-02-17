import { SendGridModule } from "@anchan828/nest-sendgrid";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailService } from "./mail.service";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SendGridModule.forRoot({
      apikey: "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",
    }),
    SharedModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
