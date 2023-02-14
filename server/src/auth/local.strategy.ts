import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserWithOutPassword } from '@/types/user.types';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserWithOutPassword> {
    const user = await this.authService.authCheck({ email, password, });

    return user;
  }
}
