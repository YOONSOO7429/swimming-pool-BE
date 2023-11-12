import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegistMemberDto {
  // userId
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
