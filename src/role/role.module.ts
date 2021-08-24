import { Global, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from './role.repository';
import { userProviders } from 'src/users/users.repository';

@Global()
@Module({
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders, ...userProviders],
  exports: [RoleService, ...roleProviders],
})
export class RoleModule {}
