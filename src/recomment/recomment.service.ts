import { Injectable } from '@nestjs/common';
import { RecommentRepository } from './recomment.repository';
import { CreateRecommentDto } from './dto/createRecomment.dto';
import { EditRecommentDto } from './dto/editRecomment.dto';

@Injectable()
export class RecommentService {
  constructor(private readonly recommentRepository: RecommentRepository) {}

  /* recomment 생성 */
  async createRecomment(
    createRecommentDto: CreateRecommentDto,
    commentId: number,
    userId: number,
  ): Promise<any> {
    try {
      const recomment = await this.recommentRepository.createRecomment(
        createRecommentDto,
        commentId,
        userId,
      );
      return recomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentService/createRecomment');
    }
  }

  /* recomment 한개 조회 */
  async findOneRecomment(recommentId: number): Promise<any> {
    try {
      const recomment =
        await this.recommentRepository.findOneRecomment(recommentId);
      return recomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentService/findOneRecomment');
    }
  }

  /* recomment 수정 */
  async editRecomment(
    editRecommentDto: EditRecommentDto,
    recommentId: number,
  ): Promise<any> {
    try {
      const editRecomment = await this.recommentRepository.editRecomment(
        editRecommentDto,
        recommentId,
      );
      return editRecomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentService/editRecomment');
    }
  }

  /* recomment 삭제 */
  async deleteRecomment(recommentId: number): Promise<any> {
    try {
      const deleteRecomment =
        await this.recommentRepository.deleteRecomment(recommentId);
      return deleteRecomment;
    } catch (e) {
      console.error(e);
      throw new Error('RecommentService/deleteRecomment');
    }
  }
}
