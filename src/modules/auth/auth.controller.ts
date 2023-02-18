import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { SignupDto } from "./dto/register.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @ApiBody({ type: SignupDto })
  async create(@Body() signupDto: SignupDto) {
    return await this.authService.createMember(signupDto);
  }

  @Post("/forgot-password")
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post("/reset-password")
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
}
