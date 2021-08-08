import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.authService.validateUser(username, password);
    Logger.log(`user`, user);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  }
}
