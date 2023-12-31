import { Module, forwardRef } from '@nestjs/common';
import { MemberController } from '@src/member/member.controller';
import { MemberService } from '@src/member/member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '@src/member/entities/member.entity';
import { MemberRepository } from '@src/member/member.repository';
import { LectureModule } from '@src/lecture/Lecture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => LectureModule),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService, MemberRepository],
})
export class MemberModule {}
