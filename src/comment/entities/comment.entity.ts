import { Lecture } from 'src/lecture/entities/Lecture.entity';
import { Recomment } from 'src/recomment/entities/recomment.entity';
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

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  commentId: number;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.comment)
  @JoinColumn({ name: 'lectureId' })
  lectureId: number;

  @Column({ type: 'varchar' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Recomment, (recomment) => recomment.commentId)
  recomment: Recomment[];
}
