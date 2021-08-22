import { Connection } from 'typeorm';
import { Role } from './entities/role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DBCONNECTION'],
  },
];
