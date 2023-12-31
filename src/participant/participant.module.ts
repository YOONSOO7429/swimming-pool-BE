import { Module } from '@nestjs/common';
import { ParticipantService } from '@src/participant/participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@src/participant/entities/participant.entity';
import { ParticipantRepository } from '@src/participant/participant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantService, ParticipantRepository],
  exports: [ParticipantService, ParticipantRepository],
})
export class ParticipantModule {}
