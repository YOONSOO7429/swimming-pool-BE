import {
  Controller,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { LessonService } from 'src/lesson/lesson.service';
import { ParticipantService } from 'src/participant/participant.service';
import { EditFeedbackDto } from './dto/editFeedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly lessonService: LessonService,
    private readonly participantService: ParticipantService,
  ) {}

  /* feedback 생성 */
  @Post(':lessonId/createFeedback')
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
          .json({ message: 'feedback 작성 권한이 없습니다.' });
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
            userId,
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

  /* feedback 수정 */
  @Put(':lessonId/:feedbackId/editFeedback')
  async editFeedback(
    @Body() editFeedbackDto: EditFeedbackDto,
    @Param('lessonId') lessonId: number,
    @Param('feedbackId') feedbackId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 수업 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 수업입니다.' });
      }

      // feedback 조회
      const feedback = await this.feedbackService.findOneFeedback(feedbackId);
      if (!feedback) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 feedback입니다.' });
      }
      // 권한 확인
      if (feedback.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'feedback 수정 권한이 없습니다.' });
      }

      if (editFeedbackDto.userId) {
        const participantUserId = editFeedbackDto.userId;

        // 참여자 조회
        const participant =
          await this.participantService.findParticipantInLesson(lessonId);

        for (let i = 0; i < participant.length; i++) {
          if (participant[i].userId === participantUserId) {
            const participantId = participant[i].participantId;
            const feedbackContent = editFeedbackDto.feedbackContent;
            await this.feedbackService.editFeedback(
              feedbackContent,
              feedbackId,
              participantId,
            );
            return res
              .status(HttpStatus.OK)
              .json({ message: 'feedback 수정 완료' });
          }
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: '수업 참여자가 아닙니다.' });
        }
      } else {
        const { feedbackContent } = editFeedbackDto;
        await this.feedbackService.editFeedbackContent(
          feedbackContent,
          lessonId,
        );
        return res
          .status(HttpStatus.OK)
          .json({ message: 'feedback 수정 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackController/editFeedback');
    }
  }

  /* feedback 삭제 */
  @Delete(':lessonId/:feedbackId/deleteFeedback')
  async deleteFeedback(
    @Param('lessonId') lessonId: number,
    @Param('feedbackId') feedbackId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 수업 조회
      const lesson = await this.lessonService.findOneLesson(lessonId);
      if (!lesson) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 수업입니다.' });
      }

      // feedback 조회
      const feedback = await this.feedbackService.findOneFeedback(feedbackId);
      if (!feedback) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 feedback입니다.' });
      }
      // 권한 확인
      if (feedback.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'feedback 수정 권한이 없습니다.' });
      } else {
        await this.feedbackService.deleteFeedback(feedbackId);
        return res
          .status(HttpStatus.OK)
          .json({ message: 'feedback 삭제 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackController/deleteFeedback');
    }
  }
}
