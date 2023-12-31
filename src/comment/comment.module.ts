import { Module, forwardRef } from '@nestjs/common';
import { CommentController } from '@src/comment/comment.controller';
import { CommentService } from '@src/comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@src/comment/entities/comment.entity';
import { CommentRepository } from '@src/comment/comment.repository';
import { LectureModule } from '@src/lecture/Lecture.module';
import { MemberModule } from '@src/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => LectureModule),
    forwardRef(() => MemberModule),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
