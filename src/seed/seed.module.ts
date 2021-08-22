import { Module } from '@nestjs/common';
import { permissionProviders } from 'src/permission/permission.repository';
import { roleProviders } from 'src/role/role.repository';
import { userProviders } from 'src/users/users.repository';
import { Seed } from './seed';

@Module({
  providers: [Seed, ...userProviders, ...permissionProviders, ...roleProviders],
  exports: [Seed],
})
export class SeedModule {}
