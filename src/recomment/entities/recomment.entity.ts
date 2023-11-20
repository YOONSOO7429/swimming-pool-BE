import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recomment')
export class Recomment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  recommentId: number;
}
