import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMemberDto {
  // userId
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
