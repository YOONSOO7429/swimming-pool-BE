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
  ): Promise<any> {
    try {
      const feedback = new Feedback();
      feedback.lessonId = lessonId;
      feedback.participantId = participantId;
      feedback.feedbackContent = createFeedbackDto.feedbackContent;
      feedback.userId = createFeedbackDto.userId;
      await this.feedbackRepository.save(feedback);
      return feedback;
    } catch (e) {
      console.error(e);
      throw new Error('FeedbackRepository/createFeedback');
    }
  }
}
