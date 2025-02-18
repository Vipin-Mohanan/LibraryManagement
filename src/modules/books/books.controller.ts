/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */

import { 
  Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, 
  UseInterceptors, UploadedFiles, 
  UseGuards
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { LibrarianAuthGuard } from 'src/guard/librarian-auth/librarian-auth.guard';
import { UserAuthGuard } from 'src/guard/user-auth/user-auth.guard';
import { addBookChecker } from './addBookChecker.util';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/addBook')
  @UseGuards(LibrarianAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 5 }],
      {
        storage: memoryStorage()
      }
    ),
  )
  async addBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
     
    const imageBuffer: Buffer[] =files.images.map(file=>file.buffer);

    await addBookChecker(createBookDto, imageBuffer)

    return await this.booksService.addBook(createBookDto, imageBuffer);
  }

  @Get('/getAllBooks')
  @UseGuards(UserAuthGuard)
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }


  @Get('/getAllBooksCategorywise')
  @UseGuards(UserAuthGuard)
  async getAllBooksCategorywise(){
    return await this.booksService.getAllBooksCategorywise();
  }


  @Get('/getBooksById/:id')
  @UseGuards(UserAuthGuard)
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBooksById(id);
  }

 @Get('/getBooksByCategoryId/:id')
 @UseGuards(UserAuthGuard)
 async getBooksByCategory(@Param('id',ParseIntPipe) id:number){
  return await this.booksService.getAllBooksByCategory(id)
 }

  @Get('/searchBook')
  @UseGuards(UserAuthGuard)
  async searchBook(@Query('query') query: string) {
    return await this.booksService.searchBook(query);
  }

  @Patch('/editBookDetails/:id')
  @UseGuards(LibrarianAuthGuard)
  @UseInterceptors(FileInterceptor('images')) 
  async editBookDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookDto: UpdateBookDto, // Will contain text fields
    @UploadedFiles() images: Express.Multer.File[] 
  ) {
    return await this.booksService.editBookDetails(id, bookDto, images);
  }
}
