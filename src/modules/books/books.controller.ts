/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/addBook')
  async addBook(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.addBook(createBookDto);
  }

  @Get('/getAllBooks')
  async getAllBooks(){
    return await this.booksService.getAllBooks()
  }

  @Get('/getBooksById/:id')
  async getBookById(@Param('id') id:number){
    return await this.booksService.getBooksById(id)
  }
  

  @Get('/searchBook')
  async searchchBook(@Query('query')  query:string){
    return await this.booksService.searchBook(query)
  }

  @Patch('/editBookDetails/:id')
  async editBookDetails(@Param('id') id:number,@Body() bookdto:UpdateBookDto){
    return await this.booksService.editBookDetails(+id,bookdto)
  }
  
}
