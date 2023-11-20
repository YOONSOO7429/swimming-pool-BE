import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  // comment
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
}
