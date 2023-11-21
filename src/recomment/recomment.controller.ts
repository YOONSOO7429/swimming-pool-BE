import { Body, Controller, Post, Param, Res, HttpStatus } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/createRecomment.dto';
import { CommentService } from 'src/comment/comment.service';

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
    } catch (e) {
      console.error(e);
      throw new Error('RecommentController/createRecomment');
    }
  }
}
