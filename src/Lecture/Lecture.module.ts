import { Module } from '@nestjs/common';
import { LectureController } from './Lecture.controller';
import { LectureService } from './Lecture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/Lecture.entity';
import { LectureRepository } from './Lecture.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository],
  exports: [LectureService, LectureRepository],
})
export class LectureModule {}
