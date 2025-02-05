/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
// import { BooksService } from './books.service';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
// import { Express } from 'express'; // Ensure Express types are available


// @Controller('books')
// export class BooksController {
//   constructor(private readonly booksService: BooksService) {}




//   @Post('/addBook')

//   @UseInterceptors(
//     FileFieldsInterceptor(
//       [
//         { name: 'images', maxCount: 5 }, // Expect an array of up to 5 images
//       ],
//       {
//         storage: diskStorage({
//           destination: 'src/uploads', // Directory where images will be stored
//           filename: (req, file, cb) => {
//             const filename = `${uuidv4()}-${file.originalname}`; // Generates a unique file name
//             cb(null, filename); // Save file with unique filename
//           },
//         }),
//       },
//     ),
//   )
//   async addBook(
//     @UploadedFiles() files: { images?: Express.Multer.File[] },
//     @Body() createBookDto: CreateBookDto) {

//       // Extract the image files from the request
//     const imagePaths = files.images?.map(file => file.path) || [];

//     return await this.booksService.addBook(createBookDto,imagePaths);
//   }

//   @Get('/getAllBooks')
//   async getAllBooks(){
//     return await this.booksService.getAllBooks()
//   }

//   @Get('/getBooksById/:id')
//   async getBookById(@Param('id') id:number){
//     return await this.booksService.getBooksById(id)
//   }
  

//   @Get('/searchBook')
//   async searchchBook(@Query('query')  query:string){
//     return await this.booksService.searchBook(query)
//   }

//   @Patch('/editBookDetails/:id')
//   async editBookDetails(@Param('id') id:number,@Body() bookdto:UpdateBookDto){
//     return await this.booksService.editBookDetails(+id,bookdto)
//   }
  
// }

import { 
  Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, 
  UseInterceptors, UploadedFiles 
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

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
