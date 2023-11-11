import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  memberId: number;

  @ManyToOne(() => User, (user) => user.member)
  @JoinColumn({ name: 'name' })
  user: User[];
}
