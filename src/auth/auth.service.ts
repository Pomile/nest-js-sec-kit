import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { firstName, lastName, email } = user;
      return {
        firstName,
        lastName,
        email,
      };
    }
    return null;
  }
}
