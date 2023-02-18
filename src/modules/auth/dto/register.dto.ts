import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleUser } from "src/common/types";

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
    enum: RoleUser,
    example: RoleUser.MEMBER,
  })
  @IsEnum(RoleUser)
  @IsNotEmpty()
  role?: RoleUser;
}
