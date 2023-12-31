import { Injectable } from '@nestjs/common';
import { LessonRepository } from '@src/lesson/lesson.repository';
import { RecordLessonDto } from '@src/lesson/dto/recordLesson.dto';
import { EditLessonDto } from '@src/lesson/dto/editLesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  /* 수업 기록 */
  async recordLesson(
    recordLessonDto: RecordLessonDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const lesson = await this.lessonRepository.recordLesson(
        recordLessonDto,
        lectureId,
        userId,
      );
      return lesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonService/recordLesson');
    }
  }

  /* 수업 한개 조회 */
  async findOneLesson(lessonId: number): Promise<any> {
    try {
      const lesson = await this.lessonRepository.findOneLesson(lessonId);
      return lesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonService/findOneLesson');
    }
  }

  /* 수업 전체 조회 */
  async findAllLesson(lectureId: number): Promise<any> {
    try {
      const lesson = await this.lessonRepository.findAllLesson(lectureId);
      return lesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonService/findAllLesson');
    }
  }

  /* 수업 수정 */
  async editLesson(
    editLessonDto: EditLessonDto,
    lessonId: number,
  ): Promise<any> {
    try {
      const editLesson = await this.lessonRepository.editLesson(
        editLessonDto,
        lessonId,
      );
      return editLesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonService/editLesson');
    }
  }

  /* 수업 기록 삭제 */
  async deleteLesson(lessonId: number): Promise<any> {
    try {
      const deleteLesson = await this.lessonRepository.deleteLesson(lessonId);
      return deleteLesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonService/deleteLesson');
    }
  }
}
