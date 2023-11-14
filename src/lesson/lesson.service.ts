import { Injectable } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { RecordLessonDto } from './dto/recordLesson.dto';

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
}
