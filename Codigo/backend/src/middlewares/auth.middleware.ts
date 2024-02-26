import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadType } from '@common/types/token.type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException(`Access Denied. No token provided.`);
    }

    try {
      const accessPayload = this.jwtService.verify(accessToken);
      req['user'] = accessPayload;
      next();
    } catch (error) {
      if (!refreshToken) {
        throw new UnauthorizedException(
          `Access Denied. No refresh token provided.`,
        );
      }

      try {
        const refreshPayload = this.jwtService.verify(refreshToken);

        const accessPayload: TokenPayloadType = {
          user: refreshPayload.user,
        };

        const newAccessToken = this.jwtService.sign(accessPayload);

        res
          .cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
          })
          .cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
          });
        req['user'] = refreshPayload;
        next();
      } catch (error) {
        throw new UnauthorizedException(
          `Access Denied. refresh token expired.`,
        );
      }
    }
  }
}
