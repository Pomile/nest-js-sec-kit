import { Repository } from 'typeorm';
import { roles } from '../data/role-constant';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Permissions } from 'src/permission/permission.enum';

export class RoleSeeder {
  constructor(
    private roleRepository: Repository<Role>,
    private permissionRepository: Repository<Permission>,
  ) {
    const userAdminitratorPermissions: string[] = [
      Permissions.createUser,
      Permissions.readUser,
      Permissions.updateUser,
      Permissions.deleteUser,
    ];

    const roleAdminitratorPermissions: string[] = [
      Permissions.createRole,
      Permissions.readRole,
      Permissions.updateRole,
      Permissions.deleteRole,
    ];

    const permissionAdminitratorPermissions: string[] = [
      Permissions.createPermission,
      Permissions.readPermission,
      Permissions.updatePermission,
      Permissions.deletePermission,
    ];
    roles.forEach(async (roleObject) => {
      let names;
      if (roleObject.name === 'RBAC Administrator')
        names = [
          ...roleAdminitratorPermissions,
          ...permissionAdminitratorPermissions,
        ];
      if (roleObject.name === 'User Administrator')
        names = userAdminitratorPermissions;
      const permissions = await permissionRepository
        .createQueryBuilder('permission')
        .where('permission.name IN (:...names)', {
          names,
        })
        .getMany();
      const permissionIds = permissions.map((perm) => perm.id);
      let role = await roleRepository.findOne({
        where: { name: roleObject.name },
        relations: ['permissions'],
      });
      if (!role) {
        role = await roleRepository.save(roleObject);
        await roleRepository
          .createQueryBuilder()
          .relation(Role, 'permissions')
          .of(role)
          .add(permissionIds);
        role = null;
      }
      if (role) {
        const existingPermissions = role.permissions.map((perm) => perm.id);
        await roleRepository.update(role.id, roleObject);
        await roleRepository
          .createQueryBuilder()
          .relation(Role, 'permissions')
          .of(role)
          .addAndRemove(permissionIds, existingPermissions);
      }
    });
  }
}
