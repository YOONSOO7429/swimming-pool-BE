import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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
    } catch (e) {
      console.error(e);
      throw new Error('CommentController/createComment');
    }
  }
}
