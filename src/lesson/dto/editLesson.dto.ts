import { IsOptional, IsString } from 'class-validator';

export class EditLessonDto {
  // lessonDay
  @IsOptional()
  @IsString()
  lessonDay: string;

  // lessonTime
  @IsOptional()
  @IsString()
  lessonTime: string;

  // lessonContent
  @IsOptional()
  @IsString()
  lessonContent: string;
}
