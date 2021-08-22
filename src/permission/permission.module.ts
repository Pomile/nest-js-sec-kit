import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { permissionProviders } from './permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [...permissionProviders, PermissionService],
  exports: [...permissionProviders, PermissionService],
})
export class PermissionModule {}
