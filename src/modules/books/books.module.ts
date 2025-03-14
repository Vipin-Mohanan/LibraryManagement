/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Book,Category])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {

  
}
