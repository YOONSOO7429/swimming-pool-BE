import { Lecture } from 'src/lecture/entities/Lecture.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { Member } from 'src/member/entities/member.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId: number;

  @Column({ type: 'varchar' })
  identification: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  userType: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'bigint' })
  birth: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Member, (member) => member.userId)
  member: Member[];

  @OneToMany(() => Lecture, (lecture) => lecture.userId)
  lecture: Lecture[];

  @OneToMany(() => Lesson, (lesson) => lesson.userId)
  lesson: Lesson[];

  @OneToMany(() => Feedback, (feedback) => feedback.userId)
  feedback: Feedback[];

  @OneToMany(() => Participant, (participant) => participant.userId)
  participant: Participant[];

  @OneToMany(() => Comment, (comment) => comment.userId)
  comment: Comment[];
}
