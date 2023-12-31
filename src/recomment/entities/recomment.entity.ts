import { Comment } from '@src/comment/entities/comment.entity';
import { User } from '@src/user/entities/user.entity';
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

@Entity('recomment')
export class Recomment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  recommentId: number;

  @ManyToOne(() => User, (user) => user.recomment)
  @JoinColumn({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Comment, (comment) => comment.recomment)
  @JoinColumn({ name: 'commentId' })
  commentId: number;

  @Column({ type: 'mediumtext' })
  recommentContent: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
