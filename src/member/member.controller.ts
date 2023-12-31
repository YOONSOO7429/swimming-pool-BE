import {
  Controller,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { MemberService } from '@src/member/member.service';
import { LectureService } from '@src/lecture/Lecture.service';
import { RegistMemberDto } from '@src/member/dto/registMember.dto';
import { DeleteMemberDto } from '@src/member/dto/deleteMember.dto';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly lectureService: LectureService,
  ) {}

  /* member 등록 */
  @Post(':lectureId/registMember')
  async registMember(
    @Body() registMemberDto: RegistMemberDto,
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
      // 권한 확인
      if (lecture.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '멤버 등록 권한이 없습니다.' });
      } else {
        await this.memberService.registMember(registMemberDto, lectureId);
        return res.status(HttpStatus.OK).json({ message: '멤버 등록 성공' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('MemberController/registMember');
    }
  }

  /* 멤버 삭제 */
  @Delete(':lectureId/deleteMember')
  async deleteMember(
    @Body() deleteMemberDto: DeleteMemberDto,
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
      // 권한 확인
      if (lecture.userId !== userId) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '멤버 삭제 권한이 없습니다.' });
      } else {
        await this.memberService.deleteMember(deleteMemberDto, lectureId);
        return res.status(HttpStatus.OK).json({ message: '멤버 삭제 성공' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('MemberController/deleteMember');
    }
  }
}
