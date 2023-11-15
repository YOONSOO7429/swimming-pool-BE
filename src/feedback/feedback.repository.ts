import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/createFeedback.dto';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  /* feedback 생성 */
  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
    lessonId: number,
    participantId: number,
    userId: number,
  ): Promise<any> {
    try {
      const feedback = new Feedback();
      feedback.lessonId = lessonId;
      feedback.participantId = participantId;
      feedback.feedbackContent = createFeedbackDto.feedbackContent;
      feedback.userId = userId;
      await this.feedbackRepository.save(feedback);
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackRepository/createFeedback');
    }
  }

  /* feedback 한개 조회 */
  async findOneFeedback(feedbackId: number): Promise<any> {
    try {
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .select([
          'feedbackId',
          'userId',
          'lessonId',
          'participantId',
          'feedbackContent',
        ])
        .where('feedbackId = :feedbackId', { feedbackId })
        .getRawOne();
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
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .update(Feedback)
        .set({ feedbackContent, participantId })
        .where('lessonId = :lessonId', { lessonId })
        .execute();
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
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .update(Feedback)
        .set({ feedbackContent })
        .where('lessonId = :lessonId', { lessonId })
        .execute();
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/editFeedbackContent');
    }
  }
}
