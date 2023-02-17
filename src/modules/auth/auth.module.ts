import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SharedModule } from "src/shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./entities/member.entity";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
     SharedModule,
     MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
