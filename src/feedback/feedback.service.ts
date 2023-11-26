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

  /* 나의 feedback 조회 */
  async findMyFeedback(userId: number, lessonId: number): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.findMyFeedback(
        userId,
        lessonId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/findMyFeedback');
    }
  }

  /* feedback 수정 */
  async editFeedback(
    feedbackContent: string,
    feedbackId: number,
    participantId: number,
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.editFeedback(
        feedbackContent,
        feedbackId,
        participantId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/editFeedback');
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

  /* feedback 삭제 */
  async deleteFeedback(feedbackId: number): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.deleteFeedback(feedbackId);
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/deleteFeedback');
    }
  }
}
