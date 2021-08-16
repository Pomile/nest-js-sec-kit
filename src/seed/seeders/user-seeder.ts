import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { users } from '../data/user-constant';

export class UserSeeder {
  constructor(private userRepository: Repository<User>) {
    users.forEach(async (user) => {
      const exists = await userRepository.findOne({
        where: { email: user.email },
      });
      if (!exists) await userRepository.save(user);
    });
  }
}
