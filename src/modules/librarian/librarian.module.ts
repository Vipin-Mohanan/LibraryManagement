/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LibrarianService } from './librarian.service';
import { LibrarianController } from './librarian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Librarian } from './entities/librarian.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Librarian])],
  controllers: [LibrarianController],
  providers: [LibrarianService],
})
export class LibrarianModule {}
