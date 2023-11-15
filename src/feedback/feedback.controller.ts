import { Controller, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/createFeedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /* feedback 생성 */
  @Post(':lessonId/create')
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Param('lessonId') lessonId: number,
  ): Promise<any> {}
}
