import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  currentPassword: string;

  @ApiProperty()
  @IsString()
  confirmCurrentPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;

  @ApiProperty()
  @IsString()
  confirmNewPassword: string;
}
