import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
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

  // name
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  // gender
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  // birth
  @IsNotEmpty()
  @IsString()
  readonly birth: string;

  // authorizationCode
  @IsOptional()
  @IsString()
  readonly authorizationCode: string;
}
