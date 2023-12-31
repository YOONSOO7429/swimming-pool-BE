import { Comment } from '@src/comment/entities/comment.entity';
import { Lesson } from '@src/lesson/entities/lesson.entity';
import { Member } from '@src/member/entities/member.entity';
import { User } from '@src/user/entities/user.entity';
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

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lectureId: number;

  @ManyToOne(() => User, (user) => user.lecture)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @Column({ type: 'varchar' })
  lectureName: string;

  @Column({ type: 'varchar' })
  lectureTime: string;

  @Column({ type: 'varchar' })
  lectureDay: string;

  @Column({ type: 'int' })
  lectureMaxMember: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Member, (member) => member.lectureId)
  member: Member[];

  @OneToMany(() => Lesson, (lesson) => lesson.lectureId)
  lesson: Lesson[];

  @OneToMany(() => Comment, (comment) => comment.lectureId)
  comment: Comment[];
}
