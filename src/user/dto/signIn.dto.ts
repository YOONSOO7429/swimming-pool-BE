import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  // identification
  @IsNotEmpty()
  @IsString()
  readonly identification: string;

  // password
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  // userType
  @IsNotEmpty()
  @IsString()
  readonly userType: string;
}
