import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSeeder } from './seeders/user-seeder';
import { PermissionSeeder } from './seeders/permission-seeder';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class Seed {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: Repository<Permission>,
  ) {
    new UserSeeder(userRepository);
    new PermissionSeeder(permissionRepository);
  }
}
