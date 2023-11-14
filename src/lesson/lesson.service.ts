import { Injectable } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { RecordLessonDto } from './dto/recordLesson.dto';
import { EditLessonDto } from './dto/editLesson.dto';

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
}