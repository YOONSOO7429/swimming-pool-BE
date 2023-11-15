import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantRepository {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  /* 참여자 조회 */
  async findParticipantInLesson(lessonId: number): Promise<any> {
    try {
      const participant = await this.participantRepository
        .createQueryBuilder('participant')
        .select(['participantId', 'userId'])
        .where('lessonId = :lessonId', { lessonId })
        .getRawMany();
      return participant;
    } catch (e) {
      console.error(e);
      throw new Error('ParticipantRepository/findParticipantInLesson');
    }
  }
}
