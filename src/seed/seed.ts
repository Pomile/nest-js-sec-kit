import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSeeder } from './seeders/user-seeder';

@Injectable()
export class Seed {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
    new UserSeeder(userRepository);
  }
}
