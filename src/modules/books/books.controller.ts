// Importing required services, DTOs, guards, and utilities
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
import { LibrarianAuthGuard } from '../../guard/librarian-auth/librarian-auth.guard';
import { UserAuthGuard } from '../../guard/user-auth/user-auth.guard';
import { addBookChecker } from './addBookChecker.util';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Controller for managing book-related operations
@ApiTags('books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

 /**
  * Adds a new book.
  * Only accessible to librarians.
  * Accepts multipart form-data for file uploads.
  */
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
  @ApiOperation({ summary: 'Add a book' })
  @ApiResponse({ status: 201, description: 'Book added successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async addBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) { 
    const imageBuffer: Buffer[] =files.images.map(file=>file.buffer);
    await addBookChecker(createBookDto, imageBuffer)
    const bookData = await this.booksService.addBook(createBookDto, imageBuffer);

    return({
      status:"Success",
      data:bookData
    })
  }

  /**
   * Retrieves all books.
   * Only accessible to authenticated users.
   */
  @Get('/getAllBooks')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 201, description: 'Get the details of all books' })
  async getAllBooks() {
   const bookData = await this.booksService.getAllBooks();

   return({
    status:"Success",
    data:bookData
  })
  }


    /**
   * Retrieves all books categorized by their respective categories.
   * Only accessible to authenticated users.
   */
  @Get('/getAllBooksCategorywise')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get all books categoryWise' })
  @ApiResponse({ status: 201, description: 'Get the details of books based on the category' })
  async getAllBooksCategorywise(){
    const bookData = await this.booksService.getAllBooksCategorywise();

    return({
      status:"Success",
      data:bookData
    })
  }


   /**
   * Retrieves details of a book by its ID.
   * Only accessible to authenticated users.
   */
  @Get('/getBooksById/:id')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Get books by id' })
  @ApiResponse({ status: 201, description: 'Get the details of books based on the id' })
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.getBooksById(id);

    return({
      status:"Success",
      data:book
    })
  }

    /**
   * Retrieves books belonging to a specific category by category ID.
   * Only accessible to authenticated users.
   */
 @Get('/getBooksByCategoryId/:id')
 @UseGuards(UserAuthGuard)
 @ApiOperation({ summary: 'Get all books categoryWise' })
 @ApiResponse({ status: 201, description: 'Get the details of books based on the category' })
 async getBooksByCategory(@Param('id',ParseIntPipe) id:number){
  const book = await this.booksService.getAllBooksByCategory(id);

  return({
    status:"Success",
    data:book
  })
 }

 
  /**
   * Searches for books based on a given query string.
   * Only accessible to authenticated users.
   */
  @Get('/searchBook')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Search Books' })
  @ApiResponse({ status: 201, description: 'Get the details of books by search functionality' })
  async searchBook(@Query('query') query: string) {
    const bookData = await this.booksService.searchBook(query);

    return({
      status:"Success",
      data:bookData
    })
  }

  /**
   * Edits the details of an existing book based on its ID.
   * Only accessible to librarians.
   * Accepts file uploads for book images.
   */
  @Patch('/editBookDetails/:id')
  @UseGuards(LibrarianAuthGuard)
  @UseInterceptors(FileInterceptor('images')) 
  @ApiOperation({ summary: 'Edit book details' })
  @ApiResponse({ status: 201, description: 'Edit the book data based on id' })
  async editBookDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookDto: UpdateBookDto, // Will contain text fields
    @UploadedFiles() images: Express.Multer.File[] 
  ) {
    const updatedBookData = await this.booksService.editBookDetails(id, bookDto, images);

    return({
      status:"Success",
      data:updatedBookData
    })
  }
}
