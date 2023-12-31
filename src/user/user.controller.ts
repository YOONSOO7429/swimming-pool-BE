import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Delete,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { SignUpDto } from '@src/user/dto/signUp.dto';
import { SignInDto } from '@src/user/dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 회원가입 */
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: any): Promise<any> {
    try {
      const identification = signUpDto.identification;
      const exUser = await this.userService.findOneUser(identification);
      if (exUser) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: '이미 가입이 완료된 정보입니다.' });
      }
      if (signUpDto.userType === '회원') {
        await this.userService.signUp(signUpDto);
        return res
          .status(HttpStatus.OK)
          .json({ message: `${signUpDto.userType} 가입 성공` });
      }
      if (signUpDto.userType === '관리자') {
        if (signUpDto.authorizationCode === process.env.AUTHORIZATION_CODE) {
          await this.userService.signUp(signUpDto);
          return res
            .status(HttpStatus.OK)
            .json({ message: `${signUpDto.userType} 가입 성공` });
        } else {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: '승인 코드를 확인해주세요' });
        }
      }
    } catch (e) {
      console.error(e);
      throw new Error('UserController/signUp');
    }
  }

  /* 로그인 */
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res() res: any): Promise<any> {
    try {
      const { identification, password, userType } = signInDto;
      const user = await this.userService.findOneUser(identification);
      // user 정보 확인
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '유저 정보가 없습니다. 가입이 필요합니다.' });
      }

      // 비밀 번호 확인
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      }
      // signIn
      if (match) {
        const userId = user.userId;
        const token = await this.userService.getToken(userId);
        res.cookie('authorization', `Bearer ${token}`);
        return res
          .status(HttpStatus.OK)
          .json({ message: `환영합니다!! ${userType}님` });
      }
    } catch (e) {
      console.error(e);
      throw new Error('UserController/signIn');
    }
  }

  /* 회원 정보 삭제 */
  @Delete('deleteUser')
  async deleteUser(@Res() res: any): Promise<any> {
    try {
      const user = res.locals.user;
      const userId = user.userId;
      if (user) {
        await this.userService.deleteUser(userId);
        return res.status(HttpStatus.OK).json({ message: '계정 삭제 완료' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('UserController/deleteUser');
    }
  }
}
