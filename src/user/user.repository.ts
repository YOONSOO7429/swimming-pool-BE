import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /* 회원 가입 */
  async signUp(
    identification: string,
    encryptedPassword: string,
  ): Promise<any> {
    try {
      const newUser = new User();
      newUser.identification = identification;
      newUser.password = encryptedPassword;
      await this.userRepository.save(newUser);
      return newUser;
    } catch (e) {
      console.error(e);
      throw new Error('UserRepository/signUp');
    }
  }

  /* 유저 한명 정보 */
  async findOneUser(identification: string): Promise<any> {
    try {
      const exUser = await this.userRepository.findOne({
        where: { identification },
      });
      return exUser;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/validateUser');
    }
  }

  /* 토큰 검사를 위한 조회 */
  async findUserByPk(userId: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      return user;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/findUserByPk');
    }
  }
}
