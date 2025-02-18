/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BooksMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
   
    
    
    
    next();
  }
}
