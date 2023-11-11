import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/Lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto } from './dto/createLecture.dto';

@Injectable()
export class LectureRepository {
  constructor(
    @InjectRepository(Lecture) private lectureRepository: Repository<Lecture>,
  ) {}

  /* 강좌 생성 */
  async createLecture(
    createLectureDto: CreateLectureDto,
    userId: number,
  ): Promise<any> {
    try {
      const lecture = new Lecture();
      const { lectureDay, lectureMaxMember, lectureName, lectureTime } =
        createLectureDto;
      lecture.lectureDay = lectureDay;
      lecture.lectureMaxMember = lectureMaxMember;
      lecture.lectureName = lectureName;
      lecture.lectureTime = lectureTime;
      lecture.userId = userId;
      await this.lectureRepository.save(lecture);

      return lecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureService/createLecture');
    }
  }
}
