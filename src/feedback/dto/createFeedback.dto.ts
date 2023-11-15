import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  // feedbackContent
  @IsNotEmpty()
  @IsString()
  readonly feedbackContent: string;

  // userId
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
