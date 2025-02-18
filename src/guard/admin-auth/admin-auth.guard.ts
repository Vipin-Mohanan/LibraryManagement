/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyJwtToken } from 'src/modules/auth/jwt.util';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        throw new UnauthorizedException("Access token is not valid")
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyJwtToken(token);  

    if(!decoded || decoded.role!=='admin')
    {
      throw new UnauthorizedException("User does not have admin access permission!!!!")
    }

    return true;
  }
}
