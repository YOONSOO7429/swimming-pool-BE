import { Module, forwardRef } from '@nestjs/common';
import { FeedbackController } from '@src/feedback/feedback.controller';
import { FeedbackService } from '@src/feedback/feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from '@src/feedback/entities/feedback.entity';
import { FeedbackRepository } from '@src/feedback/feedback.repository';
import { LessonModule } from '@src/lesson/lesson.module';
import { ParticipantModule } from '@src/participant/participant.module';

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
