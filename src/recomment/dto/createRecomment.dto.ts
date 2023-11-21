import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecommentDto {
  // recomment
  @IsNotEmpty()
  @IsString()
  readonly recomment: string;
}
