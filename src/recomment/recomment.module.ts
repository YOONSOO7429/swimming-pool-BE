import { Module, forwardRef } from '@nestjs/common';
import { RecommentController } from './recomment.controller';
import { RecommentService } from './recomment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recomment } from './entities/recomment.entity';
import { CommentModule } from 'src/comment/comment.module';
import { RecommentRepository } from './recomment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recomment]),
    forwardRef(() => CommentModule),
  ],
  controllers: [RecommentController],
  providers: [RecommentService, RecommentRepository],
  exports: [RecommentService, RecommentRepository],
})
export class RecommentModule {}
