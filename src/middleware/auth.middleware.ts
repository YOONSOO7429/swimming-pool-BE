import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthMiddleWare implements NestMiddleware<Request, Response> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.cookies.authorization;

      // Cookie가 존재하지 않을 경우
      if (!authorization) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '로그인이 필요한 기능입니다.' });
      }

      // Cookie가 존재할 경우
      const [tokenType, tokenValue] = authorization.split(' ');
      if (tokenType !== 'Bearer') {
        res.clearCookie('authorization');
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: '잘못된 쿠키 형식입니다.' });
      }

      const { userId } = this.jwtService.verify(tokenValue, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findUserByPk(userId);

      if (user) {
        res.locals.user = user;
        next();
      } else {
        res.clearCookie('authorization');
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: '회원 정보에 문제가 있습니다. 확인이 필요합니다.' });
      }
    } catch (e) {
      res.clearCookie('authorization');
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: '잘못된 인증 방법입니다.(auth.middleware)' });
    }
  }
}
