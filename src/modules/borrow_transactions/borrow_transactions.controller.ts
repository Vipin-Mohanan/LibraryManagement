import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowTransactionsService } from './borrow_transactions.service';
import { CreateBorrowTransactionDto } from './dto/create-borrow_transaction.dto';
import { UserAuthGuard } from '../../guard/user-auth/user-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('borrow')
@ApiBearerAuth()
@Controller('borrow')
export class BorrowTransactionsController {
  constructor(
    private readonly borrowTransactionsService: BorrowTransactionsService,
  ) {}

  /**
   * Allows a user to borrow a book.
   * Requires authentication via `UserAuthGuard`.
   * 
   * @param {CreateBorrowTransactionDto} borrowdto - The request body containing borrow transaction details.
   * @returns {Promise<{ status: string; data: { book_id: number; copies_available: number } }>} 
   * An object containing the borrowed book ID and the remaining available copies.
   * @example
   * ```json
   * {
   *   "user_id": 1,
   *   "book_id": 101,
   *   "borrow_date": "2025-03-20"
   * }
   * ```
   */

  @ApiBearerAuth()
  @Post('/borrowBook')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Borrow book' })
  @ApiResponse({
    status: 201,
    description: 'Borrow the book and return the remaining copies available',
  })
  async borrowBook(@Body() borrowdto: CreateBorrowTransactionDto) {
    const borrowedBook =
      await this.borrowTransactionsService.borrowBook(borrowdto);
    return {
      status: 'success',
      data: {
        'book_id:': borrowedBook.book_id,
        'copies_available:': borrowedBook.copies_available,
      },
    };
  }

   /**
   * Retrieves details of borrowed books by user ID.
   * Requires authentication via `UserAuthGuard`.
   * 
   * @param {string} id - The ID of the user.
   * @returns {Promise<{ status: string; data: any }>} A success response containing borrowed book details.
   * @example
   * ```typescript
   * GET /borrow/viewBorrowBooks/1
   * ```
   */

  @Get('/viewBorrowBooks/:id')
  @UseGuards(UserAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Borrow book details' })
  @ApiResponse({
    status: 201,
    description: 'Returns the data of the books that has been borrowed',
  })
  async borrowBookDetails(@Param('id') id: string) {
    const borrowedBooks =
      await this.borrowTransactionsService.borrowBookDetails(Number(id));
    return {
      status: 'success',
      data: borrowedBooks,
    };
  }


   /**
   * Handles the return of a borrowed book and updates availability.
   * Requires authentication via `UserAuthGuard`.
   * 
   * @param {number} user_id - The ID of the user returning the book.
   * @param {number} book_id - The ID of the book being returned.
   * @returns {Promise<{ status: string; data: { returnDate: string } }>} 
  
   */
  @ApiBearerAuth()
  @Patch('/return')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Return the book' })
  @ApiResponse({ status: 201, description: 'Update the available book data' })
  async updateReturnedBook(
    @Query('user_id') user_id: number,
    @Query('book_id') book_id: number,
  ) {
    const updatedData = await this.borrowTransactionsService.updateReturnedBook(
      user_id,
      book_id,
    );
    return {
      status: 'Success',
      data: {
        returnDate: updatedData.return_date,
      },
    };
  }
}
