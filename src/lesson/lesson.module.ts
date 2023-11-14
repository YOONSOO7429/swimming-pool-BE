import { Module, forwardRef } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';
import { LectureModule } from 'src/Lecture/Lecture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    forwardRef(() => LectureModule),
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService, LessonRepository],
})
export class LessonModule {}
