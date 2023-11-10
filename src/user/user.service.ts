import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /* 회원 가입 */
  async signUp(signInId: string, password: string): Promise<any> {
    try {
      const encryptedPassword = await bcrypt.hash(password, 11);
      const newUser = await this.userRepository.signUp(
        signInId,
        encryptedPassword,
      );
      return newUser;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/signUp');
    }
  }

  /* token 설정 */
  async getToken(userId: number): Promise<any> {
    try {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      return token;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/getToken');
    }
  }

  /* 회원 가입 유무 확인 */
  async findOneUser(identification: string): Promise<any> {
    try {
      const exUser = await this.userRepository.findOneUser(identification);
      return exUser;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/validateUser');
    }
  }
}
