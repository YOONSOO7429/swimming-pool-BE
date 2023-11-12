import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { RegistMemberDto } from './dto/registMember.dto';
import { DeleteMemberDto } from './dto/deleteMember.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  /* member 등록 */
  async registMember(
    registMemberDto: RegistMemberDto,
    lectureId: number,
  ): Promise<any> {
    try {
      const { userId } = registMemberDto;
      const registMember = new Member();
      registMember.lectureId = lectureId;
      registMember.userId = userId;
      await this.memberRepository.save(registMember);
      return registMember;
    } catch (e) {
      console.error(e);
      throw new Error('MemberRepository/registMember');
    }
  }

  /* member 삭제 */
  async deleteMember(
    deleteMemberDto: DeleteMemberDto,
    lectureId: number,
  ): Promise<any> {
    try {
      const { userId } = deleteMemberDto;
      const deleteMember = await this.memberRepository
        .createQueryBuilder('member')
        .delete()
        .from(Member)
        .where('lectureId = :lectureId', { lectureId })
        .andWhere('userId = :userId', { userId })
        .execute();
      return deleteMember;
    } catch (e) {
      console.error(e);
      throw new Error('MemberRepository/deleteMember');
    }
  }
}
