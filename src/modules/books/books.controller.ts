/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */

import { 
  Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, 
  UseInterceptors, UploadedFiles 
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/addBook')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 5 }],
      {
        storage: memoryStorage()
      }
    ),
  )
  async addBook(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() createBookDto: CreateBookDto
  ) {
    
    console.log("Book DTO", createBookDto);
    
    const imageBuffer: Buffer[] =files.images.map(file=>file.buffer)
    return await this.booksService.addBook(createBookDto, imageBuffer);
  }

  @Get('/getAllBooks')
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @Get('/getBooksById/:id')
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBooksById(id);
  }

 @Get('/getBooksByCategoryId/:id')
 async getBooksByCategory(@Param('id',ParseIntPipe) id:number){
  return await this.booksService.getAllBooksByCategory(id)
 }

  @Get('/searchBook')
  async searchBook(@Query('query') query: string) {
    return await this.booksService.searchBook(query);
  }

  @Patch('/editBookDetails/:id')
  async editBookDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookDto: UpdateBookDto
  ) {
    return await this.booksService.editBookDetails(id, bookDto);
  }
}
