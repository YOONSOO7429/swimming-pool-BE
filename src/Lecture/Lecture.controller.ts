import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { LectureService } from './Lecture.service';
import { CreateLectureDto } from './dto/createLecture.dto';
import { EditLectureDto } from './dto/editLecture.dto';

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
      if (user.userType === '관리자') {
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

  /* 모든 강좌 조회 */
  @Get('lectureList')
  async lectureList(@Res() res: any): Promise<any> {
    try {
      // 강좌 조회
      const lecture = await this.lectureService.findAllLecture();
      return res.status(HttpStatus.OK).json(lecture);
    } catch (e) {
      console.error(e);
      throw new Error('LectureController/lectureList');
    }
  }

  /* 강좌 상세 조회 */
  @Get(':lectureId/detail')
  async detailLecture(
    @Param('lectureId') lectureId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (!lecture) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '조회된 강좌가 없습니다.' });
      }
      return res.status(HttpStatus.OK).json(lecture);
    } catch (e) {
      console.error(e);
      throw new Error('LectureController/detailLecture');
    }
  }

  /* 강좌 수정 */
  @Put(':lectureId/edit')
  async editLecture(
    @Body() editLectureDto: EditLectureDto,
    @Param('lectureId') lectureId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (lecture.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정 권한이 없습니다.' });
      } else {
        const editLecture = await this.lectureService.editLecture(
          editLectureDto,
          lectureId,
        );
        if (!editLecture) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: '강좌 수정 실패' });
        }
        return res.status(HttpStatus.OK).json({ message: '강좌 수정 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LectureController/editLecture');
    }
  }

  /* 강좌 삭제 */
  @Delete(':lectureId/delete')
  async deleteLecture(
    @Param('lectureId') lectureId: number,
    @Res() res: any,
  ): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;

      // 강좌 조회
      const lecture = await this.lectureService.findOneLecture(lectureId);
      if (lecture.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '수정 권한이 없습니다.' });
      } else {
        const deleteLecture =
          await this.lectureService.deleteLecture(lectureId);
        if (!deleteLecture) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: '강좌 삭제 실패' });
        }
        return res.status(HttpStatus.OK).json({ message: '강좌 삭제 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('LectureController/deleteLecture');
    }
  }
}
