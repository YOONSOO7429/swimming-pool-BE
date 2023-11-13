import { Lecture } from 'src/Lecture/entities/Lecture.entity';
import { Member } from 'src/member/entities/member.entity';
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
}
