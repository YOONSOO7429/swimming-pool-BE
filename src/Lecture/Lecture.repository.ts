import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/Lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto } from './dto/createLecture.dto';
import { EditLectureDto } from './dto/editLecture.dto';

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

  /* 강좌 한개 조회 */
  async findOneLecture(lectureId: number): Promise<any> {
    try {
      const lecture = await this.lectureRepository
        .createQueryBuilder('lecture')
        .select(['lectureId', 'userId'])
        .where('lectureId = :lectureId', { lectureId })
        .getRawOne();
      return lecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureService/findOneLectures');
    }
  }

  /* 강좌 수정 */
  async editLecture(
    editLectureDto: EditLectureDto,
    lectureId: number,
  ): Promise<any> {
    try {
      const { lectureName, lectureTime, lectureDay, lectureMaxMember } =
        editLectureDto;
      const editLecture = await this.lectureRepository
        .createQueryBuilder('lecture')
        .update(Lecture)
        .set({ lectureName, lectureTime, lectureDay, lectureMaxMember })
        .where('lectureId = :lectureId', { lectureId })
        .execute();
      return editLecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureService/editLecture');
    }
  }
}
