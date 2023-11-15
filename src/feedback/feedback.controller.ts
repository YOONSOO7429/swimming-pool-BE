import { Controller, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { LessonService } from 'src/lesson/lesson.service';
import { ParticipantService } from 'src/participant/participant.service';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly lessonService: LessonService,
    private readonly participantService: ParticipantService,
  ) {}

  /* feedback 생성 */
  @Post(':lessonId/create')
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Param('lessonId') lessonId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;
      const participantUserId = createFeedbackDto.userId;

      // 수업 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 수업입니다.' });
      }

      // 권한 확인
      if (lesson.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'feedback 작성 권한이 없스니다.' });
      }

      // 참여자 조회
      const participant =
        await this.participantService.findParticipantInLesson(lessonId);

      for (let i = 0; i < participant.length; i++) {
        if (participant[i].userId === participantUserId) {
          const participantId = participant[i].participantId;
          await this.feedbackService.createFeedback(
            createFeedbackDto,
            lessonId,
            participantId,
          );
          return res
            .status(HttpStatus.OK)
            .json({ message: 'feedback 작성 완료' });
        }
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '수업 참여자가 아닙니다.' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackController/createFeedback');
    }
  }
}
