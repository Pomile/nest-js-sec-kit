import { Module } from '@nestjs/common';
import { CustomJwtModule } from './jwt.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { userProviders } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    CustomJwtModule.register({
      env: 'production | development',
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...userProviders],
  exports: [AuthService],
})
export class AuthModule {}
