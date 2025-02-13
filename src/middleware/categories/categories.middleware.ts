/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { verifyJwtToken } from 'src/modules/auth/jwt.util';

@Injectable()
export class CategoriesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = verifyJwtToken(token)
      console.log("decoded token",token);

      if(decoded.role==='user' && req.url.includes('/addCategory')){

      }
      else if(decoded.role==='user'||decoded.role==='librarian' && req.url.includes('/addCategory') ){

      }
      else{
        throw new ForbiddenException("invalid url")
      }
    

    next();
  }
}
