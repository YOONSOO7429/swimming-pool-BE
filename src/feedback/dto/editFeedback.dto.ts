import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditFeedbackDto {
  // feedbackContent
  @IsOptional()
  @IsString()
  readonly feedbackContent: string;

  // userId
  @IsOptional()
  @IsNumber()
  readonly userId: number;
}
