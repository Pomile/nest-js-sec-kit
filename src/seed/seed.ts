import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSeeder } from './seeders/user-seeder';
import { PermissionSeeder } from './seeders/permission-seeder';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleSeeder } from './seeders/role-seeder';

@Injectable()
export class Seed {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PERMISSION_REPOSITORY')
    private permissionRepository: Repository<Permission>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {
    new PermissionSeeder(permissionRepository);
    new RoleSeeder(roleRepository, permissionRepository);
    new UserSeeder(userRepository, roleRepository);
  }
}
