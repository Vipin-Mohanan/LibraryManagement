/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, MethodNotAllowedException, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    

    if(req.method==='POST' && req.url.includes('/signup'))
    {
          const {phone_number, name, email, address, password, confirmPassword} = req.body;

          if(!name || !email || !address || !phone_number || !password || !confirmPassword)
          {
            throw new BadRequestException('Please fill in all fields');
          }

          if (!/^\d{10,}$/.test(phone_number)) {
            throw new BadRequestException('Invalid phone number');
          }

          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new BadRequestException('Invalid email format');
          }
          next();
    }
    else{
      throw new MethodNotAllowedException('Invalid method or url')
    }
 
  }
}
