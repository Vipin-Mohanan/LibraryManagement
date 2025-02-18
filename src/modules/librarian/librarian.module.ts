/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Librarian } from './entities/librarian.entity';
import { User } from '../user/entities/user.entity';
import { LibrarianMiddleware } from 'src/middleware/librarian/librarian.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Librarian, User])],
  controllers: [LibrarianController],
  providers: [LibrarianService],
})

export class LibrarianModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LibrarianMiddleware)
    .forRoutes(LibrarianController)
  }
}
