import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/createComment.dto';
import { EditCommentDto } from './dto/editComment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  /* comment 생성 */
  async createComment(
    createCommentDto: CreateCommentDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const comment = await this.commentRepository.createComment(
        createCommentDto,
        lectureId,
        userId,
      );
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentService/createComment');
    }
  }

  /* comment 권한 확인 */
  async findOneComment(commentId: number): Promise<any> {
    try {
      const comment = await this.commentRepository.findOneComment(commentId);
      return comment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentService/findOneComment');
    }
  }

  /* comment 수정 */
  async editComment(
    editCommentDto: EditCommentDto,
    lectureId: number,
    userId: number,
  ): Promise<any> {
    try {
      const editComment = await this.commentRepository.editComment(
        editCommentDto,
        lectureId,
        userId,
      );
      return editComment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentService/editComment');
    }
  }

  /* comment 삭제 */
  async deleteComment(lectureId: number, userId: number): Promise<any> {
    try {
      const deleteComment = await this.commentRepository.deleteComment(
        lectureId,
        userId,
      );
      return deleteComment;
    } catch (e) {
      console.error(e);
      throw new Error('CommentService/deleteComment');
    }
  }
}
