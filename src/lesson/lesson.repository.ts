import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { RecordLessonDto } from './dto/recordLesson.dto';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  /* 수업 기록 */
  async recordLesson(
    recordLessonDto: RecordLessonDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const { lessonDay, lessonContent, lessonTime } = recordLessonDto;
      const lesson = new Lesson();
      lesson.lectureId = lectureId;
      lesson.userId = userId;
      lesson.lessonDay = lessonDay;
      lesson.lessonTime = lessonTime;
      lesson.lessonContent = lessonContent;
      await this.lessonRepository.save(lesson);
      return lesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonRepository/recordLesson');
    }
  }
}
