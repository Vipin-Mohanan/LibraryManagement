/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { verifyJwtToken } from './../../modules/auth/jwt.util';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class BooksMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

  
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = verifyJwtToken(token);

    console.log("Decoded: ", decoded);
    

      if(!decoded)
      {
        throw new UnauthorizedException('Invalid token');
      }

      if(decoded.role==='admin')
      {
        if (req.method==='POST' && req.url.includes('/addBook') ) 
          {
           

          }
      }

     
    

   
    next();
  }
}
