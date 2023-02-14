import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '@/prisma.service';
import { jwtSecret } from '@/utils/constans';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email, },
    });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 사용자입니다.',
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }
}
