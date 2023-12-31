import { Module, forwardRef } from '@nestjs/common';
import { LectureController } from '@src/lecture/Lecture.controller';
import { LectureService } from '@src/lecture/Lecture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from '@src/lecture/entities/Lecture.entity';
import { LectureRepository } from '@src/lecture/Lecture.repository';
import { MemberModule } from '@src/member/member.module';
import { LessonModule } from '@src/lesson/lesson.module';
import { CommentModule } from '@src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture]),
    forwardRef(() => MemberModule),
    forwardRef(() => LessonModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository],
  exports: [LectureService, LectureRepository],
})
export class LectureModule {}
