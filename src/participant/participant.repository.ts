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
        .leftJoin('user', 'user', 'user.userId = participant.userId')
        .select([
          'participant.participantId AS participantId',
          'participant.userId AS userId',
          'user.name AS name',
          'user.gender AS gender',
          'user.birth AS birth',
        ])
        .where('participant.lessonId = :lessonId', { lessonId })
        .orderBy('user.name', 'ASC')
        .getRawMany();
      return participant;
    } catch (e) {
      console.error(e);
      throw new Error('ParticipantRepository/findParticipantInLesson');
    }
  }
}
