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
      throw new Error('FeedbackRepository/findOneFeedback');
    }
  }

  /* 나의 feedback 조회 */
  async findMyFeedback(userId: number, lessonId: number): Promise<any> {
    try {
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .select(['feedbackId', 'participantId', 'feedbackContent'])
        .where('userId = :userId', { userId })
        .andWhere('lessonId = :lessonId', { lessonId })
        .getRawOne();
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackRepository/findMyFeedback');
    }
  }

  /* feedback 수정 */
  async editFeedback(
    feedbackContent: string,
    feedbackId: number,
    participantId: number,
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .update(Feedback)
        .set({ feedbackContent, participantId })
        .where('feedbackId = :feedbackId', { feedbackId })
        .execute();
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackRepository/editFeedback');
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
      throw new Error('FeedbackRepository/editFeedbackContent');
    }
  }

  /* feedback 삭제 */
  async deleteFeedback(feedbackId: number): Promise<any> {
    try {
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const feedback = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .update(Feedback)
        .set({ deletedAt: today })
        .where('feedbackId = :feedbackId', { feedbackId })
        .execute();
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackRepository/deleteFeedback');
    }
  }
}
