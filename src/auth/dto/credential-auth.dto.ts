import { IsEmail, IsString } from 'class-validator';
export class CredentialAuthDto {
  @IsEmail()
  username: string;
  @IsString()
  password: string;
}
