import { Module, forwardRef } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackRepository } from './feedback.repository';
import { LessonModule } from 'src/lesson/lesson.module';
import { ParticipantModule } from 'src/participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    forwardRef(() => LessonModule),
    forwardRef(() => ParticipantModule),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  exports: [FeedbackService, FeedbackRepository],
})
export class FeedbackModule {}
