import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLectureDto {
  // lectureName
  @IsNotEmpty()
  @IsString()
  readonly lectureName: string;

  // lectureTime
  @IsNotEmpty()
  @IsString()
  readonly lectureTime: string;

  // lectureDay
  @IsNotEmpty()
  @IsString()
  readonly lectureDay: string;

  // lectureMaxMember
  @IsNotEmpty()
  @IsNumber()
  readonly lectureMaxMember: number;
}
