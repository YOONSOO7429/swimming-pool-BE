import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  /* 참여자 조회 */
  async findParticipantInLesson(lessonId: number): Promise<any> {
    try {
      const participant =
        await this.participantRepository.findParticipantInLesson(lessonId);
      return participant;
    } catch (e) {
      console.error(e);
      throw new Error('ParticipantService/findParticipantInLesson');
    }
  }
}
