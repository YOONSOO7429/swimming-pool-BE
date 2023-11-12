import { Module, forwardRef } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberRepository } from './member.repository';
import { LectureModule } from 'src/Lecture/Lecture.module';

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
