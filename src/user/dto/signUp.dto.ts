import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  // gender
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  // birth
  @IsNotEmpty()
  @IsNumber()
  readonly birth: number;
}
