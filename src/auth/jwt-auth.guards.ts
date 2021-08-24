import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private context;
  constructor(context: ExecutionContext) {
    super();
    this.context = context;
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    return super.canActivate(context);
  }

  handleRequest(err, user, info ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    console.log('this is me doing things');
    return user;
  }
}
