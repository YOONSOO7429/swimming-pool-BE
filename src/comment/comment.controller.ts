import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CommentService } from '@src/comment/comment.service';
import { CreateCommentDto } from '@src/comment/dto/createComment.dto';
import { LectureService } from '@src/lecture/Lecture.service';
import { MemberService } from '@src/member/member.service';
import { EditCommentDto } from '@src/comment/dto/editComment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly lectureService: LectureService,
    private readonly memberService: MemberService,
  ) {}

  /* Comment 생성 */
  @Post(':lectureId/createComment')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('lectureId') lectureId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (!lecture) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 강좌입니다.' });
      }

      // member 조회
      const member = await this.memberService.findAllMember(lectureId);
      const isMember = member.some((member) => member.userId === userId);
      // 권한 확인
      if (!isMember || lecture.userId !== userId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message:
            '강좌의 강사 또는 멤버가 아니면 commnet 작성 권한이 없습니다.',
        });
      }

      // comment 생성
      await this.commentService.createComment(
        createCommentDto,
        lectureId,
        userId,
      );
      return res.status(HttpStatus.OK).json({ message: '댓글 작성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('CommentController/createComment');
    }
  }

  /* comment 수정 */
  @Put(':lectureId/:commentId/editComment')
  async editComment(
    @Body() editCommentDto: EditCommentDto,
    @Param('lectureId') lectureId: number,
    @Param('commentId') commentId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (!lecture) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 강좌입니다.' });
      }

      // comment 권한 확인
      const comment = await this.commentService.findOneComment(commentId);
      if (!comment) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정 권한이 없습니다.' });
      }

      // comment 수정
      await this.commentService.editComment(editCommentDto, lectureId, userId);
      return res.status(HttpStatus.OK).json({ message: '댓글 수정 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('CommentController/editComment');
    }
  }

  /* comment 삭제 */
  @Delete(':lectureId/:commentId/deleteComment')
  async deleteComment(
    @Param('lectureId') lectureId: number,
    @Param('commentId') commentId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (!lecture) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 강좌입니다.' });
      }

      // comment 권한 확인
      const comment = await this.commentService.findOneComment(commentId);
      if (!comment) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정 권한이 없습니다.' });
      }

      // comment 삭제
      await this.commentService.deleteComment(lectureId, userId);
      return res.status(HttpStatus.OK).json({ message: '댓글 삭제 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('CommentController/deleteComment');
    }
  }
}
