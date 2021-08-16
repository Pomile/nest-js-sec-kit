import { Module } from '@nestjs/common';
import { userProviders } from 'src/users/users.repository';
import { Seed } from './seed';

@Module({
  providers: [Seed, ...userProviders],
  exports: [Seed],
})
export class SeedModule {}
