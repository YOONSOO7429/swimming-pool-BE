import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /* 회원 가입 */
  async signUp(signUpDto: SignUpDto): Promise<any> {
    try {
      const { identification, password, userType, gender, name, birth } =
        signUpDto;
      const encryptedPassword = await bcrypt.hash(password, 11);
      const newUser = await this.userRepository.signUp(
        identification,
        encryptedPassword,
        userType,
        gender,
        name,
        birth,
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
      throw new Error('UserService/findOneUser');
    }
  }

  /* 토큰 검사를 위한 조회 */
  async findUserByPk(userId: number): Promise<any> {
    try {
      const user = await this.userRepository.findUserByPk(userId);
      return user;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/findUserByPk');
    }
  }

  /* 계정 삭제 */
  async deleteUser(userId: number): Promise<any> {
    try {
      const deleteUser = await this.userRepository.deleteUser(userId);
      return deleteUser;
    } catch (e) {
      console.error(e);
      throw new Error('UserService/deleteUser');
    }
  }
}
