import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { jwtExp, jwtSecret } from '@/utils/constans';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: parseInt(jwtExp, 10),
      },
    }),
    UsersModule,
  ],
  controllers: [ AuthController, ],
  providers: [ AuthService, UsersService, JwtStrategy, LocalStrategy, ],
})
export class AuthModule {}
