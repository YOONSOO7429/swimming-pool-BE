import { Lecture } from 'src/Lecture/entities/Lecture.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lesson')
export class Lesson {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lessonId: number;

  @ManyToOne(() => User, (user) => user.lesson)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.lesson)
  @JoinColumn({ name: 'lectureId' })
  lectureId: number;

  @Column({ type: 'varchar' })
  lessonDay: string;

  @Column({ type: 'varchar' })
  lessonTime: string;

  @Column({ type: 'mediumtext' })
  lessonContent: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.lessonId)
  feedback: Feedback[];
}
