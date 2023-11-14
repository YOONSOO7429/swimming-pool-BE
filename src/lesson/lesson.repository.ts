import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { RecordLessonDto } from './dto/recordLesson.dto';
import { EditLessonDto } from './dto/editLesson.dto';

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

  /* 수업 한개 조회 */
  async findOneLesson(lessonId: number): Promise<any> {
    try {
      const lesson = await this.lessonRepository
        .createQueryBuilder('lesson')
        .select([
          'lessonId',
          'userId',
          'lectureId',
          'lessonDay',
          'lessonTime',
          'lessonContent',
        ])
        .where('lessonId = :lessonId', { lessonId })
        .getRawOne();
      return lesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonRepository/findOneLesson');
    }
  }

  /* 수업 수정 */
  async editLesson(
    editLessonDto: EditLessonDto,
    lessonId: number,
  ): Promise<any> {
    try {
      const { lessonContent, lessonDay, lessonTime } = editLessonDto;
      const editLesson = await this.lessonRepository
        .createQueryBuilder('lesson')
        .update(Lesson)
        .set({ lessonContent, lessonDay, lessonTime })
        .where('lessonId = :lessonId', { lessonId })
        .execute();
      return editLesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonRepository/editLesson');
    }
  }

  /* 수업 기록 삭제 */
  async deleteLesson(lessonId: number): Promise<any> {
    try {
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteLesson = await this.lessonRepository
        .createQueryBuilder('lesson')
        .update(Lesson)
        .set({ deletedAt: today })
        .where('lessonId = :lessonId', { lessonId })
        .execute();
      return deleteLesson;
    } catch (e) {
      console.error(e);
      throw new Error('LessonRepository/deleteLesson');
    }
  }
}
