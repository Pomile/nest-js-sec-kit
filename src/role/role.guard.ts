import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RBAC } from './interfaces/rbac.interface';
import { RBAC_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;
  constructor(
    private reflector: Reflector,
    @Inject('USER_REPOSITORY') userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY') roleRepository: Repository<Role>,
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RBAC>(RBAC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    const data = await this.userRepository.findOne({
      where: { id: user.userId },
      relations: ['roles'],
    });
    let permissions = [];
    if (data.roles.length > 0) {
      const roleIds = data.roles.map((role) => role.id);
      console.log(roleIds);
      const rolePermissions = await this.roleRepository
        .createQueryBuilder('role')
        .andWhereInIds(roleIds)
        .leftJoinAndSelect('role.permissions', 'permission')
        .getMany();
      console.log(rolePermissions);
      rolePermissions.forEach(role => {
        permissions = permissions.concat(role.permissions);
      });
    }
    if (!user) return false;
    console.log(requiredRoles);
    const permittedRoles = [...requiredRoles.roles];
    const permittedPriviledges = [...requiredRoles.permissions]
    const userRoles = [];
    data.roles.forEach((role) => {
      userRoles.push(role.name);
    });
    console.log(permissions);
    const isPermittedRole = userRoles.map((role) =>
      permittedRoles.includes(role),
    );
    const isPermittedPriviledge = permissions.map((permission) =>
      permittedPriviledges.includes(permission),
    );
    const isAllowed = [
      isPermittedRole.includes(true),
      isPermittedPriviledge.includes(true),
    ].includes(true);
    return isAllowed;
  }
}
