import { Module } from '@nestjs/common';
import { RecommentController } from './recomment.controller';
import { RecommentService } from './recomment.service';

@Module({
  controllers: [RecommentController],
  providers: [RecommentService]
})
export class RecommentModule {}
