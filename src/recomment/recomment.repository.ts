import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recomment } from './entities/recomment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommentRepository {
  constructor(
    @InjectRepository(Recomment)
    private memberRepository: Repository<Recomment>,
  ) {}
}
