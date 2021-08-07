import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CredentialAuthDto } from './dto/credential-auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Body() authDto: CredentialAuthDto) {
    return this.authService.validateUser(authDto.username, authDto.password);
  }
}
