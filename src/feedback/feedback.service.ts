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
  ): Promise<any> {
    try {
      const feedback = await this.feedbackRepository.createFeedback(
        createFeedbackDto,
        lessonId,
        participantId,
      );
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackService/createFeedback');
    }
  }
}
