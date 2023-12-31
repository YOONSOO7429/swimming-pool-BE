import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recomment } from '@src/recomment/entities/recomment.entity';
import { Repository } from 'typeorm';
import { CreateRecommentDto } from '@src/recomment/dto/createRecomment.dto';
import { EditRecommentDto } from '@src/recomment/dto/editRecomment.dto';

@Injectable()
export class RecommentRepository {
  constructor(
    @InjectRepository(Recomment)
    private recommentRepository: Repository<Recomment>,
  ) {}

  /* recomment 생성 */
  async createRecomment(
    createRecommentDto: CreateRecommentDto,
    commentId: number,
    userId: number,
  ): Promise<any> {
    try {
      const recomment = new Recomment();
      recomment.commentId = commentId;
      recomment.userId = userId;
      recomment.recommentContent = createRecommentDto.recommentContent;
      await this.recommentRepository.save(recomment);
      return recomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentRepository/createRecomment');
    }
  }

  /* recomment 한개 조회 */
  async findOneRecomment(recommentId: number): Promise<any> {
    try {
      const recomment = await this.recommentRepository
        .createQueryBuilder('recomment')
        .select(['recommentId', 'commentId', 'userId', 'recommentContent'])
        .where('recommentId = :recommentId', { recommentId })
        .getRawOne();
      return recomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentRepository/findOneRecomment');
    }
  }

  /* recomment 수정 */
  async editRecomment(
    editRecommentDto: EditRecommentDto,
    recommentId: number,
  ): Promise<any> {
    try {
      const { recommentContent } = editRecommentDto;
      const editRecomment = await this.recommentRepository
        .createQueryBuilder('recomment')
        .update(Recomment)
        .set({ recommentContent })
        .where('recommentId = :recommentId', { recommentId })
        .execute();
      return editRecomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentRepository/editRecomment');
    }
  }

  /* recomment 삭제 */
  async deleteRecomment(recommentId: number): Promise<any> {
    try {
      const koreaTimezoneOffset = 9 * 60;
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() + koreaTimezoneOffset * 60000,
      );
      const deleteRecomment = await this.recommentRepository
        .createQueryBuilder('recomment')
        .update(Recomment)
        .set({ deletedAt: today })
        .where('recommentId = :recommentId', { recommentId })
        .execute();
      return deleteRecomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentRepository/deleteRecomment');
    }
  }
}
