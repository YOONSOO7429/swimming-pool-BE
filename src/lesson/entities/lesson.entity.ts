import { Lecture } from 'src/Lecture/entities/Lecture.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
}
