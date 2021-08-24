import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { users } from '../data/user-constant';

export class UserSeeder {
  constructor(
    private userRepository: Repository<User>,
    private roleRepository: Repository<Role>,
  ) {
    const globalAdmin = 'Global Administrator';
    const userAdministrator = 'User Administrator';

    users.forEach(async (data) => {
      let roleName;
      if (data.email === 'admin@example.com') roleName = globalAdmin;
      if (data.email === 'rbac@example.com') roleName = userAdministrator;
      const role = await roleRepository.findOne({ where: { name: roleName } });
      let user = await userRepository.findOne({
        where: { email: data.email },
        relations: ['roles'],
      });
      if (!user) {
        user = await userRepository.save(data);
        await userRepository
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .add([role.id]);
        user = null;
      }
      if (user) {
        const existingRole = user.roles.map((role) => role.id);
        await userRepository.update(user.id, data);
        await userRepository
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .addAndRemove([role.id], existingRole);
      }
    });
  }
}
