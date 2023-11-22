import { IsOptional, IsString } from 'class-validator';

export class EditRecommentDto {
  // recommentContent
  @IsOptional()
  @IsString()
  readonly recommentContent: string;
}
