import { IsOptional, IsString } from 'class-validator';

export class EditCommentDto {
  // comment
  @IsOptional()
  @IsString()
  readonly comment: string;
}
