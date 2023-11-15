import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/createFeedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  /* feedback 생성 */
  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
    lessonId: number,
    participantId: number,
    userId: number,
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.createFeedback(
        createFeedbackDto,
        lessonId,
        participantId,
        userId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/createFeedback');
    }
  }

  /* feedback 한개 조회 */
  async findOneFeedback(feedbackId: number): Promise<any> {
    try {
      const feedback =
        await this.feedbackRepository.findOneFeedback(feedbackId);
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/findOneFeedback');
    }
  }

  /* feedback 수정 */
  async editFeedback(
    feedbackContent: string,
    lessonId: number,
    participantId: number,
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.editFeedback(
        feedbackContent,
        lessonId,
        participantId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/eidtFeedback');
    }
  }

  /* feedback 내용만 수정 */
  async editFeedbackContent(
    feedbackContent: string,
    lessonId: number,
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.editFeedbackContent(
        feedbackContent,
        lessonId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/editFeedbackContent');
    }
  }
}
