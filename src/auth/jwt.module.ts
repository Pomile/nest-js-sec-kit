import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config';

@Global()
@Module({
  providers: [],
  exports: ['CustomJwtModule'],
})
export class CustomJwtModule {
  static register(options) {
    return this.getJwtModule(options);
  }

  static getJwtModule(options) {
    const config = new ConfigService({ env: options.env });
    return JwtModule.register({
      secret: config.get('APP_SECRET'),
      signOptions: { expiresIn: '60s' },
    });
  }
}
