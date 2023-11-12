import { Injectable } from '@nestjs/common';
import { LectureRepository } from './Lecture.repository';
import { CreateLectureDto } from './dto/createLecture.dto';
import { EditLectureDto } from './dto/editLecture.dto';

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

  /* 강좌 한개 조회 */
  async findOneLecture(lectureId: number): Promise<any> {
    try {
      const lecture = await this.lectureRepository.findOneLecture(lectureId);
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
      const editLecture = await this.lectureRepository.editLecture(
        editLectureDto,
        lectureId,
      );
      return editLecture;
    } catch (e) {
      console.error(e);
      throw new Error('LectureService/editLecture');
    }
  }
}
