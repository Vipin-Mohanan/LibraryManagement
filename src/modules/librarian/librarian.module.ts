/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Librarian } from './entities/librarian.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Librarian, User])],
  controllers: [LibrarianController],
  providers: [LibrarianService],
})
export class LibrarianModule {}
