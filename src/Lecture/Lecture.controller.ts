import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LectureService } from './Lecture.service';
import { CreateLectureDto } from './dto/createLecture.dto';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /* 강좌 생성 */
  @Post('create')
  async createLecture(
    @Body() createLectureDto: CreateLectureDto,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;
      if (user.account === '관리자') {
        const lecture = await this.lectureService.createLecture(
          createLectureDto,
          userId,
        );
        return res
          .status(HttpStatus.OK)
          .json({ messsage: '강좌 생성 성공', lectureId: lecture.lectureId });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '강좌 개설 권한이 없습니다.' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LectureController/createLecture');
    }
  }
}
