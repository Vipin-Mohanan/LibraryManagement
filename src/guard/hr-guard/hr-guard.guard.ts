import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyJwtToken } from 'src/modules/auth/jwt.util';

@Injectable()
export class HrGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req=context.switchToHttp().getRequest();
    const header = req.headers['authorization']

    if(!header || header.startsWith(
      'Bearer'
    )){
      throw new UnauthorizedException('invalid access token')
    }

     const token = header.split(' ')[1]
     const decoded = verifyJwtToken(token)


     if(decoded.role!='admin'){
        throw new UnauthorizedException('permission denied')
     }

    return true;
  }
}
