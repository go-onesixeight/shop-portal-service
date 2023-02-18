import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  emailReferenceNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newConfirmPassword: string;
}
