import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from './role.repository';


@Module({
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
  exports: [RoleService, ...roleProviders],
})
export class RoleModule {}
