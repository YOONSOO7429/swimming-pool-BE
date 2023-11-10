import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  // identification
  @IsNotEmpty()
  @IsString()
  readonly identification: string;

  // password
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
