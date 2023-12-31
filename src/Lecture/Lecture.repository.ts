import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from '@src/lecture/entities/Lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto } from '@src/lecture/dto/createLecture.dto';
import { EditLectureDto } from '@src/lecture/dto/editLecture.dto';

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
      throw new Error('LectureRepository/createLecture');
    }
  }

  /* 모든 강좌 조회 */
  async findAllLecture(): Promise<any> {
    try {
      const lecture = await this.lectureRepository
        .createQueryBuilder('lecture')
        .leftJoin('member', 'member', 'member.lectureId = lecture.lectureId')
        .select([
          'lecture.lectureId AS lectureId',
          'lecture.userId AS userId',
          'lecture.lectureName AS lectureName',
          'lecture.lectureTime AS lectureTime',
          'lecture.lectureDay AS lectureDay',
          'lecture.lectureMaxMember AS lectureMaxMember',
          'COUNT(DISTINCT member.userId) AS lectureAttendedMember',
        ])
        .andWhere('deletedAt IS NULL')
        .groupBy('lecture.lectureId')
        .getRawMany();
      return lecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureRepository/findOneLectures');
    }
  }

  /* 강좌 한개 조회 */
  async findOneLecture(lectureId: number): Promise<any> {
    try {
      const lecture = await this.lectureRepository
        .createQueryBuilder('lecture')
        .leftJoin('member', 'member', 'member.lectureId = lecture.lectureId')
        .select([
          'lecture.lectureId AS lectureId',
          'lecture.userId AS userId',
          'lecture.lectureName AS lectureName',
          'lecture.lectureTime AS lectureTime',
          'lecture.lectureDay AS lectureDay',
          'lecture.lectureMaxMember AS lectureMaxMember',
          'COUNT(DISTINCT member.userId) AS lectureAttendedMember',
        ])
        .where('lecture.lectureId = :lectureId', { lectureId })
        .andWhere('deletedAt IS NULL')
        .getRawOne();
      return lecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureRepository/findOneLectures');
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
      throw new Error('LectureRepository/editLecture');
    }
  }

  /* 강좌 삭제 */
  async deleteLecture(lectureId: number): Promise<any> {
    try {
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteLecture = await this.lectureRepository
        .createQueryBuilder('lecture')
        .update(Lecture)
        .set({ deletedAt: today })
        .where('lectureId = :lectureId', { lectureId })
        .execute();
      return deleteLecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureRepository/deleteLecture');
    }
  }
}
