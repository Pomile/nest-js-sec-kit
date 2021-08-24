
import { Repository } from 'typeorm';
import { permissions } from '../data/permission-constant';
import { Permission } from '../../permission/entities/permission.entity';

export class PermissionSeeder {
  constructor(private permissionRepository: Repository<Permission>) {
    permissions.forEach(async (permission) => {
      const exists = await permissionRepository.findOne({
        where: { name: permission.name },
      });
      if (!exists) await permissionRepository.save(permission);
    });
  }
}
