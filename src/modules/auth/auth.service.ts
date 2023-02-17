import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { SignupDto } from "./dto/register.dto";
import { SharedService } from "src/shared/shared.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Member } from "./entities/member.entity";
import { IFromResponses, ISendMail } from "src/common/interfaces";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private sharedService: SharedService,
    private dataSource: DataSource,
    private mailService: MailService,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async createMember(signupDto: SignupDto): Promise<IFromResponses> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      Logger.log(
        `[${this.createMember.name}] => body ${JSON.stringify(signupDto)}`,
      );

      if (signupDto?.password !== signupDto?.confirmPassword) {
        return this.sharedService.returnResponse(
          false,
          HttpStatus.BAD_REQUEST,
          this.sharedService.statusText(HttpStatus.BAD_REQUEST),
          signupDto,
        ) as IFromResponses;
      }

      const member = new Member();
      member.username = signupDto.username;
      member.email = signupDto.email;
      member.password = this.sharedService.encrypt(signupDto.password);
      member.confirmPassword = this.sharedService.encrypt(
        signupDto.confirmPassword,
      );
      const saveMember = await this.memberRepository.save(member);

      if (!this.sharedService.isObjectEmpty(saveMember)) {
        return this.sharedService.returnResponse(
          false,
          HttpStatus.BAD_REQUEST,
          this.sharedService.statusText(HttpStatus.BAD_REQUEST),
          saveMember,
        ) as IFromResponses;
      }

      Logger.log(
        `[${this.createMember.name}] => response ${JSON.stringify(saveMember)}`,
      );

      await queryRunner.commitTransaction();
      return this.sharedService.returnResponse(
        true,
        HttpStatus.CREATED,
        this.sharedService.statusText(HttpStatus.CREATED),
        saveMember,
      ) as IFromResponses;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const { message } = error as { message: string };
      Logger.log(`[${this.createMember.name}] => error ${message}`);
      return this.sharedService.returnResponse(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.sharedService.statusText(HttpStatus.INTERNAL_SERVER_ERROR),
        null,
        message,
      ) as IFromResponses;
    } finally {
      await queryRunner.release();
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const findEmail = await this.memberRepository.findOne({
        where: { email: forgotPasswordDto?.email },
      });

      if (!findEmail) {
        return this.sharedService.returnResponse(
          false,
          HttpStatus.NOT_FOUND,
          this.sharedService.statusText(HttpStatus.NOT_FOUND),
          findEmail,
        ) as IFromResponses;
      }

      const { email, username, ...result } = findEmail;
      const emailEncrypt = this.sharedService.encrypt(email);
      const emailBase64 = this.sharedService.encryptBase64(emailEncrypt);

      const link = `http://app.xx.net/reset-password?email=${emailBase64}`;
      const sendMailTemplate: ISendMail = {
        email: email,
        text: "Reset Password",
        subject: "App",
        html: `
        <div
        style="
          width: 450px;
          background: white;
          padding: 16px;
          border-radius: 3px;
        "
      >
        <p style="font-weight: bold">สวัสดี ${username}</p>
        <p style="color: gray">
          Link to reset your password.
        </p>
        <a
          href="${link}"
          style="
            text-decoration: none;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            white-space: nowrap;
            background: #0071e3;
            color: #fff;
            font-size: 12px;
            line-height: 1.33337;
            font-weight: 400;
            letter-spacing: -0.01em;
            min-width: 23px;
            padding-left: 11px;
            padding-right: 11px;
            padding-top: 4px;
            padding-bottom: 4px;
            border-radius: 12px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          "
          >Reset password</a
        >
        <p style="color: gray">Thanks!</p>
      </div>
      <style>
        * {
          font-family: "Roboto", sans-serif;
        }
        a:hover {
          opacity: 0.9;
        }
      </style>`,
      };

      const sendMail = await this.mailService.sendMailWithSendGrid(
        sendMailTemplate,
      );

      if (sendMail[0]?.statusCode === 202) {
        return this.sharedService.returnResponse(
          true,
          HttpStatus.ACCEPTED,
          this.sharedService.statusText(HttpStatus.ACCEPTED),
          sendMail,
        ) as IFromResponses;
      }
    } catch (error) {
      const { message } = error as { message: string };
      Logger.log(`[${this.forgotPassword.name}] => error ${message}`);
      return this.sharedService.returnResponse(
        false,
        HttpStatus.INTERNAL_SERVER_ERROR,
        this.sharedService.statusText(HttpStatus.INTERNAL_SERVER_ERROR),
        null,
        message,
      ) as IFromResponses;
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
