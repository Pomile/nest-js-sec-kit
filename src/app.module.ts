<<<<<<< HEAD
import { Inject, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    ConfigModule.register({ env: 'production | development' }),
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
=======
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> 4c05bef (generate resource - users)
