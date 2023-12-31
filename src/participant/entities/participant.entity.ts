import { Feedback } from '@src/feedback/entities/feedback.entity';
import { Lesson } from '@src/lesson/entities/lesson.entity';
import { User } from '@src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('participant')
export class Participant {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  participantId: number;

  @ManyToOne(() => User, (user) => user.participant)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.participant)
  @JoinColumn({ name: 'lessonId' })
  lessonId: number;

  @OneToMany(() => Feedback, (feedback) => feedback.participantId)
  feedback: Feedback[];
}
