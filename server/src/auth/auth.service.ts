import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from '@/prisma.service';
import { SignUpDTO } from './dto/sign.up.dto';
import { SignInDTO } from './dto/sign.in.dto';
import { jwtExp, jwtSecret } from '@/utils/constans';
import { UserWithOutPassword } from '@/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly prismaService: PrismaService,
    // eslint-disable-next-line no-unused-vars
    private readonly jwtService: JwtService
  ) { }

  async signUp(signUpDTO: SignUpDTO): Promise<string> {
    const { email, userName, password, } = signUpDTO;

    const emailCheck = await this.prismaService.user.findUnique({
      where: { email, },
    });

    const userNameCheck = await this.prismaService.user.findUnique({
      where: { userName, },
    });

    if (emailCheck) {
      throw new HttpException(
        '이미 존재하는 이메일입니다.',
        HttpStatus.CONFLICT
      );
    }

    if (userNameCheck) {
      throw new HttpException(
        '이미 존재하는 닉네임입니다.',
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prismaService.user.create({
      data: {
        email,
        userName,
        password: hashedPassword,
      },
    });

    return 'ok';
  }

  async authCheck(signInDTO: SignInDTO): Promise<UserWithOutPassword> {
    const user = await this.prismaService.user.findUnique({
      where: { email: signInDTO.email, },
    });

    if (!user) {
      throw new HttpException(
        '정보가 올바르지 않습니다.',
        HttpStatus.BAD_REQUEST
      );
    }

    const isMatch = await this.comparePassword(
      signInDTO.password,
      user.password
    );

    if (!isMatch) {
      throw new HttpException(
        '정보가 올바르지 않습니다.',
        HttpStatus.BAD_REQUEST
      );
    }

    const { password, ...myUser } = user;

    return myUser;
  }

  async signIn(user: UserWithOutPassword, response: Response) {
    const cookie = await this.cookieAndToken(user.email);

    response.setHeader('Set-Cookie', cookie);

    return response.send(user);
  }

  async getMyUser(id: number) {
    return this.prismaService.user.findUnique({
      where: { id: Number(id), },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
  }

  async signOut(response: Response) {
    const cookie = `Authentication=; HttpOnly; Path=/; Max-Age=0`;

    response.setHeader('Set-Cookie', cookie);
    return response.sendStatus(200);
  }

  async hashPassword(password: string) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const res = await bcrypt.compare(password, hashedPassword);

    return res;
  }

  async cookieAndToken(email: string) {
    const payload = { email, };

    const token = await this.jwtService.signAsync(payload, { secret: jwtSecret, });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtExp}`;
  }
}
