import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleAccount } from "src/common/types";

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty()
  image?: string;

  @ApiProperty({
    enum: RoleAccount,
    example: RoleAccount.Member,
  })
  @IsEnum(RoleAccount)
  @IsNotEmpty()
  role?: RoleAccount;
}
