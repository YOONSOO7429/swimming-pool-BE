import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  feedbackId: number;

  @ManyToOne(() => User, (user) => user.feedback)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.feedback)
  @JoinColumn({ name: 'lessonId' })
  lessonId: number;

  @ManyToOne(() => Participant, (participant) => participant.feedback)
  @JoinColumn({ name: 'participantId' })
  participantId: number;

  @Column({ type: 'varchar' })
  feedback: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
