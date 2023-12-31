import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@src/comment/entities/comment.entity';
import { CreateCommentDto } from '@src/comment/dto/createComment.dto';
import { EditCommentDto } from '@src/comment/dto/editComment.dto';

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
      comment.commentContent = createCommentDto.commentContent;
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
        .select(['commentId', 'userId', 'lectureId', 'commentContent'])
        .where('commentId = :commentId', { commentId })
        .getRawOne();
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/findOneComment');
    }
  }

  /* comment 모두 조회 */
  async findAllComment(lectureId: number): Promise<any> {
    try {
      const comment = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoin('user', 'user', 'user.userId = comment.userId')
        .leftJoin(
          'recomment',
          'recomment',
          'recomment.commentId = comment.commentId',
        )
        .leftJoin(
          'user',
          'recomment_user',
          'recomment_user.userId = user.userId',
        )
        .select([
          'comment.commentId AS commentId',
          'comment.commentContent AS commentContent',
          'comment.userId AS userId',
          'user.name AS name',
          `JSON_ARRAYAGG(JSON_OBJECT(
            'recommentId', recomment.recommentId,
            'recommentContent', recomment.recommentContent,
            'userId', recomment.userId,
            'name', recomment_user.name
            ))AS recomment`,
        ])
        .where('comment.lectureId = :lectureId', { lectureId })
        .andWhere('comment.deletedAt IS NULL')
        .orderBy('comment.createdAt', 'DESC')
        .getRawMany();
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/findAllComment');
    }
  }

  /* comment 수정 */
  async editComment(
    editCommentDto: EditCommentDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const { commentContent } = editCommentDto;

      const editComment = await this.commentRepository
        .createQueryBuilder('comment')
        .update(Comment)
        .set({ commentContent })
        .where('lectureId = :lectureId', { lectureId })
        .andWhere('userId = :userId', { userId })
        .execute();
      return editComment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/editComment');
    }
  }

  /* comment 삭제 */
  async deleteComment(lectureId: number, userId: number): Promise<any> {
    try {
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteComment = await this.commentRepository
        .createQueryBuilder('commnet')
        .update(Comment)
        .set({ deletedAt: today })
        .where('lectureId = :lectureId', { lectureId })
        .andWhere('userId = :userId', { userId })
        .execute();
      return deleteComment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentRepository/deleteComment');
    }
  }
}
