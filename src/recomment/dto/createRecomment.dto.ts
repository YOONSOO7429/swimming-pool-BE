import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecommentDto {
  // recommentContent
  @IsNotEmpty()
  @IsString()
  readonly recommentContent: string;
}
