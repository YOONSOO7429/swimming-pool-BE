import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  // commentContent
  @IsNotEmpty()
  @IsString()
  readonly commentContent: string;
}
