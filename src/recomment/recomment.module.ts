import { Module, forwardRef } from '@nestjs/common';
import { RecommentController } from '@src/recomment/recomment.controller';
import { RecommentService } from '@src/recomment/recomment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recomment } from '@src/recomment/entities/recomment.entity';
import { CommentModule } from '@src/comment/comment.module';
import { RecommentRepository } from '@src/recomment/recomment.repository';

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
