import { Inject, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    DatabaseModule.forRoot({
      config: {
        databaseType: 'relational',
        type: 'mysql',
        orm: 'typeorm',
      },
      useClass: ConfigService,
    }),
    UsersModule,
    AuthModule,
    ConfigModule.register({ env: 'production | development' }),
    RoleModule,
    PermissionModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject('DBCONNECTION') private connection: Connection) {
    if (this.connection.isConnected)
      Logger.log(`Connected successfully`, 'Database');
  }
}
