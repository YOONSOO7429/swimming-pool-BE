import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 회원가입 */
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: any): Promise<any> {
    try {
      const { identification, password } = signUpDto;
      const exUser = await this.userService.findOneUser(identification);
      if (exUser) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: '이미 가입이 완료된 정보입니다.' });
      }
      await this.userService.signUp(identification, password);

      return res.status(HttpStatus.OK).json({ message: '회원가입 성공' });
    } catch (e) {
      console.error(e);
      throw new Error('UserController/signUp');
    }
  }

  /* 로그인 */
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res() res: any): Promise<any> {
    try {
      const { identification, password } = signInDto;
      const encryptedPassword = await bcrypt.hash(password, 11);
      const user = await this.userService.findOneUser(identification);
      // user 정보 확인
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '유저 정보가 없습니다. 가입이 필요합니다.' });
      }
      // 비밀 번호 확인
      if (user.password !== encryptedPassword) {
        return res
          .status(HttpStatus.NOT_ACCEPTABLE)
          .json({ message: '비밀번호가 일치하지 않습니다.' });
      }
      // signIn
      if (user.password === encryptedPassword) {
        const userId = user.userId;
        const token = await this.userService.getToken(userId);
        res.cookie('authorization', token);
        return res.status(HttpStatus.OK).json({ message: 'signIn 성공' });
      }
    } catch (e) {
      console.error(e);
      throw new Error('UserController/signIn');
    }
  }
}
