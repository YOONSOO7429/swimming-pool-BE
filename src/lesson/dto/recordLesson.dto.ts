import { IsNotEmpty, IsString } from 'class-validator';

export class RecordLessonDto {
  // lessonDay
  @IsNotEmpty()
  @IsString()
  lessonDay: string;

  // lessonTime
  @IsNotEmpty()
  @IsString()
  lessonTime: string;

  // lessonContent
  @IsNotEmpty()
  @IsString()
  lessonContent: string;
}
