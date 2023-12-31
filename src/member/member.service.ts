import { Injectable } from '@nestjs/common';
import { MemberRepository } from '@src/member/member.repository';
import { RegistMemberDto } from '@src/member/dto/registMember.dto';
import { DeleteMemberDto } from '@src/member/dto/deleteMember.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  /* member 등록 */
  async registMember(
    registMemberDto: RegistMemberDto,
    lectureId: number,
  ): Promise<any> {
    try {
      const registMember = await this.memberRepository.registMember(
        registMemberDto,
        lectureId,
      );
      return registMember;
    } catch (e) {
      console.error(e);
      throw new Error('MemberService/registMember');
    }
  }

  /* member 삭제 */
  async deleteMember(
    deleteMemberDto: DeleteMemberDto,
    lectureId: number,
  ): Promise<any> {
    try {
      const deleteMember = await this.memberRepository.deleteMember(
        deleteMemberDto,
        lectureId,
      );
      return deleteMember;
    } catch (e) {
      console.error(e);
      throw new Error('MemberService/deleteMember');
    }
  }

  /* 멤버 조회 */
  async findAllMember(lectureId: number): Promise<any> {
    try {
      const member = await this.memberRepository.findAllMember(lectureId);
      return member;
    } catch (e) {
      console.error(e);
      throw new Error('MemberService/findAllMember');
    }
  }
}
