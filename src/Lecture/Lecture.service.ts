import { Injectable } from '@nestjs/common';
import { LectureRepository } from './Lecture.repository';
import { CreateLectureDto } from './dto/createLecture.dto';

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}

  /* 강좌 생성 */
  async createLecture(
    createLectureDto: CreateLectureDto,
    userId: number,
  ): Promise<any> {
    try {
      const lecture = await this.lectureRepository.createLecture(
        createLectureDto,
        userId,
      );
      return lecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureService/createLecture');
    }
  }
}
