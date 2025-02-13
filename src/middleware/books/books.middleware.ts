/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJwtToken } from './../../modules/auth/jwt.util';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class BooksMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = verifyJwtToken(token);
    console.log('Decoded: ', decoded);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    const adminRoutes = [
      '/getAllBooks',
      '/searchBook',
      '/addBook',
      '/editBookDetails/',
      '/getBooksByCategoryId/',
      '/getBooksById/',
    ];

    const userRoutes = [
      '/getAllBooks',
      '/searchBook',
      '/getBooksById/',
      '/getBooksByCategoryId/',
    ];
    
    if (
      decoded.role === 'librarian' &&
      adminRoutes.some((path) => req.url.includes(path))
    ) {
      console.log('Admin has access to this route:', req.url);
    } else if (
      decoded.role === 'user' &&
      userRoutes.some((path) => req.url.includes(path))
    ) {
      console.log('user has access to this route:', req.url);
    } else {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    next();
  }
}
