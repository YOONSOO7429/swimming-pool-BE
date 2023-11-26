import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Res,
  HttpStatus,
  Delete,
  Get,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { RecordLessonDto } from './dto/recordLesson.dto';
import { LectureService } from 'src/lecture/Lecture.service';
import { EditLessonDto } from './dto/editLesson.dto';
import { ParticipantService } from 'src/participant/participant.service';
import { FeedbackService } from 'src/feedback/feedback.service';

@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly lectureService: LectureService,
    private readonly participantService: ParticipantService,
    private readonly feedbackService: FeedbackService,
  ) {}

  /* 수업 기록하기 */
  @Post(':lectureId/recordLesson')
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

  /* 수업 조회 하기 */
  @Get(':lessonId/detailLesson')
  async detailLesson(
    @Param('lessonId') lessonId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // lesson 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '조회된 수업이 없습니다.' });
      }
      // 참여자 조회
      const participant =
        await this.participantService.findParticipantInLesson(lessonId);

      // 개인 feedback 조회
      const feedback = await this.feedbackService.findMyFeedback(
        userId,
        lessonId,
      );
      if (feedback) {
        return res
          .status(HttpStatus.OK)
          .json({ lesson, participant, feedback });
      } else {
        return res.status(HttpStatus.OK).json({ lesson, participant });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LessonController/detailLesson');
    }
  }

  /* 수업 기록 수정하기 */
  @Put(':lessonId/editLesson')
  async editLesson(
    @Body() editLessonDto: EditLessonDto,
    @Param('lessonId') lessonId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // lesson 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 수업입니다.' });
      }
      if (lesson.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수업 수정 권한이 없습니다.' });
      } else {
        await this.lessonService.editLesson(editLessonDto, lessonId);
        return res.status(HttpStatus.OK).json({ message: '수업 수정 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LessonController/editLesson');
    }
  }

  /* 수업 기록 삭제하기 */
  @Delete(':lessonId/deleteLesson')
  async deleteLesson(
    @Param('lessonId') lessonId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // lesson 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 수업입니다.' });
      }
      if (lesson.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수업 삭제 권한이 없습니다.' });
      } else {
        await this.lessonService.deleteLesson(lessonId);
        return res.status(HttpStatus.OK).json({ message: '수업 삭제 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LessonController/deleteLesson');
    }
  }
}
