import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { EditCommentDto } from './dto/editComment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  /* comment 생성 */
  async createComment(
    createCommentDto: CreateCommentDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const comment = new Comment();
      comment.comment = createCommentDto.comment;
      comment.lectureId = lectureId;
      comment.userId = userId;
      await this.commentRepository.save(comment);
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/createComment');
    }
  }

  /* comment 권한 확인 */
  async findOneComment(commentId: number): Promise<any> {
    try {
      const comment = await this.commentRepository
        .createQueryBuilder('comment')
        .select(['userId'])
        .where('commentId = :commentId', { commentId })
        .getRawOne();
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/findOneComment');
    }
  }

  /* comment 수정 */
  async editComment(
    editCommentDto: EditCommentDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const { comment } = editCommentDto;

      const editComment = await this.commentRepository
        .createQueryBuilder('comment')
        .update(Comment)
        .set({ comment })
        .where('lectureId = :lectureId', { lectureId })
        .andWhere('userId = :userId', { userId })
        .execute();
      return editComment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/editComment');
    }
  }
}
