/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verifyJwtToken } from 'src/modules/auth/jwt.util';

@Injectable()
export class BorrowTransactionsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {


    const token = req.headers['authorization'].split(' ')[1];
    const decoded =verifyJwtToken(token)

    console.log("decoded token",decoded);
    
    if(!decoded){
      throw new UnauthorizedException('Invalid token')
    }

    if(decoded.role==='user'){
      if(req.method==='POST' && req.url.includes('/borrowBook')){
        next();
      }
      else if(req.method==='PATCH' && req.url.includes('/return')){
        next();
      }
      else{
        throw new ForbiddenException("Invalid method or url")
      }
    }
  }
        
    
  }
