import {
  Body,
  Controller,
  Post,
  Param,
  Res,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/createRecomment.dto';
import { CommentService } from 'src/comment/comment.service';
import { EditRecommentDto } from './dto/editRecomment.dto';

@Controller('recomment')
export class RecommentController {
  constructor(
    private readonly recommentService: RecommentService,
    private readonly commentSerivce: CommentService,
  ) {}

  /* recomment 생성 */
  @Post(':commentId/createRecomment')
  async createRecomment(
    @Body() createRecommentDto: CreateRecommentDto,
    @Param('commentId') commentId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // comment 조회
      const comment = await this.commentSerivce.findOneComment(commentId);
      if (!comment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 댓글입니다.' });
      }

      // recomment 생성
      await this.recommentService.createRecomment(
        createRecommentDto,
        commentId,
        userId,
      );
      return res.status(HttpStatus.OK).json({ message: 'recomment 작성 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('RecommentController/createRecomment');
    }
  }

  /* recomment 수정 */
  @Put(':commentId/:recommentId/editRecomment')
  async editRecomment(
    @Body() editRecommentDto: EditRecommentDto,
    @Param('commentId') commentId: number,
    @Param('recommentId') recommentId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // comment 조회
      const comment = await this.commentSerivce.findOneComment(commentId);
      if (!comment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 댓글입니다.' });
      }

      // recomment 조회
      const recomment =
        await this.recommentService.findOneRecomment(recommentId);
      if (!recomment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 대댓글입니다.' });
      }
      if (recomment.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정할 권한이 없습니다.' });
      }

      // recomment 수정
      const editRecomment = await this.recommentService.editRecomment(
        editRecommentDto,
        recommentId,
      );
      return res.status(HttpStatus.OK).json({ message: '대댓글 수정 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('RecommentController/editRecomment');
    }
  }

  /* recomment 삭제 */
  @Delete(':commentId/:recommentId/deleteRecomment')
  async deleteRecomment(
    @Param('commentId') commentId: number,
    @Param('recommentId') recommentId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // comment 조회
      const comment = await this.commentSerivce.findOneComment(commentId);
      if (!comment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 댓글입니다.' });
      }

      // recomment 조회
      const recomment =
        await this.recommentService.findOneRecomment(recommentId);
      if (!recomment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '존재하지 않는 대댓글입니다.' });
      }
      if (recomment.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정할 권한이 없습니다.' });
      }

      // recomment 삭제
      const deleteRecomment =
        await this.recommentService.deleteRecomment(recommentId);
      return res.status(HttpStatus.OK).json({ message: 'recomment 삭제 완료' });
    } catch (e) {
      console.error(e);
      throw new Error('RecommentController/deleteRecomment');
    }
  }
}
