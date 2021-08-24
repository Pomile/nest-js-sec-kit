import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [...userProviders, UsersService],
})
export class UsersModule {}
