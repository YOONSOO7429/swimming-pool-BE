import { IsOptional, IsString } from 'class-validator';

export class EditCommentDto {
  // commentContent
  @IsOptional()
  @IsString()
  readonly commentContent: string;
}
