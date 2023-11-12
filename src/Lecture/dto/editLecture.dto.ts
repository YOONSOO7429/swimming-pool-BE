import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditLectureDto {
  // lectureName
  @IsNotEmpty()
  @IsOptional()
  readonly lectureName: string;

  // lectureTime
  @IsNotEmpty()
  @IsOptional()
  readonly lectureTime: string;

  // lectureDay
  @IsNotEmpty()
  @IsOptional()
  readonly lectureDay: string;

  // lectureMaxMember
  @IsNotEmpty()
  @IsOptional()
  readonly lectureMaxMember: number;
}
