import {
  Body,
  Controller, Get, HttpCode, Logger, Post, Res, UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/sign.up.dto';
import { LocalGuard } from './local.guard';
import { GetUser } from './get.user.decorator';
import { UserWithOutPassword } from '@/types/user.types';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  logger = new Logger('AuthController');
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<string> {
    return this.authService.signUp(signUpDTO);
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@GetUser() user: UserWithOutPassword, @Res() res: Response) {
    return this.authService.signIn(user, res);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMyUser(@GetUser() user: UserWithOutPassword) {
    return this.authService.getMyUser(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('signout')
  async signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }
}
