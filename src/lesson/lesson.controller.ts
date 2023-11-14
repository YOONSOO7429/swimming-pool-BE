import { Body, Controller, Post, Param, Res, HttpStatus } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { RecordLessonDto } from './dto/recordLesson.dto';
import { LectureService } from 'src/Lecture/Lecture.service';

@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly lectureService: LectureService,
  ) {}

  /* 수업 기록하기 */
  @Post(':lectureId/record')
  async recordLesson(
    @Body() recordLessonDto: RecordLessonDto,
    @Param('lectureId') lectureId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (!lecture) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 강좌입니다.' });
      } else {
        // 수업 기록
        const lesson = await this.lessonService.recordLesson(
          recordLessonDto,
          lectureId,
          userId,
        );
        return res.status(HttpStatus.OK).json({ message: '수업 기록 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LessonController/recordLesson');
    }
  }
}
