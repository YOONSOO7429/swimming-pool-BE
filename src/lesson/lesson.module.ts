import { Module, forwardRef } from '@nestjs/common';
import { LessonController } from '@src/lesson/lesson.controller';
import { LessonService } from '@src/lesson/lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '@src/lesson/entities/lesson.entity';
import { LessonRepository } from '@src/lesson/lesson.repository';
import { LectureModule } from '@src/lecture/Lecture.module';
import { ParticipantModule } from '@src/participant/participant.module';
import { FeedbackModule } from '@src/feedback/feedback.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    forwardRef(() => LectureModule),
    forwardRef(() => ParticipantModule),
    forwardRef(() => FeedbackModule),
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService, LessonRepository],
})
export class LessonModule {}
